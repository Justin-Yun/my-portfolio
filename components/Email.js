"use client";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { siteContent } from "../app/content"; // Adjust the path as necessary

const Email = () => {
  const form = useRef();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [timeUntilReset, setTimeUntilReset] = useState(0);

  // Rate limiting configuration
  const RATE_LIMIT_MAX = 2; // Maximum emails per time window
  const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
  const RATE_LIMIT_KEY = "email_submissions";

  useEffect(() => {
    setIsClient(true);
    checkRateLimit();
  }, []);

  // Check if user has exceeded rate limit
  const checkRateLimit = () => {
    const submissions = getSubmissionHistory();
    const now = Date.now();

    // Filter submissions within the current time window
    const recentSubmissions = submissions.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
    );

    if (recentSubmissions.length >= RATE_LIMIT_MAX) {
      setIsRateLimited(true);
      const oldestSubmission = Math.min(...recentSubmissions);
      const resetTime = oldestSubmission + RATE_LIMIT_WINDOW;
      setTimeUntilReset(Math.ceil((resetTime - now) / 1000 / 60)); // minutes
      return false;
    }

    setIsRateLimited(false);
    return true;
  };

  // Get submission history from localStorage
  const getSubmissionHistory = () => {
    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Add submission to history
  const addSubmissionToHistory = () => {
    try {
      const submissions = getSubmissionHistory();
      const now = Date.now();

      // Add current submission and clean old ones
      const updatedSubmissions = [...submissions, now].filter(
        (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
      );

      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(updatedSubmissions));
    } catch (error) {
      console.warn("Could not save submission history:", error);
    }
  };

  // Alternative: IP-based rate limiting (requires backend)
  const checkIPRateLimit = async () => {
    try {
      const response = await fetch("/api/check-rate-limit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check" }),
      });

      const data = await response.json();
      return data.allowed;
    } catch (error) {
      console.warn("Rate limit check failed:", error);
      return true; // Allow if check fails
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    // Check rate limit before proceeding
    if (!checkRateLimit()) {
      setMessage(
        `Rate limit exceeded. Please wait ${timeUntilReset} minutes before sending another message.`
      );
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Send email via EmailJS
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      console.log(result.text);

      // Add to submission history only after successful send
      addSubmissionToHistory();

      setMessage("Message sent successfully! 🎉");

      // Reset form fields individually to maintain structure
      if (form.current) {
        const formData = new FormData(form.current);
        form.current.reset();
        // Force a re-render to ensure proper layout
        setTimeout(() => {
          // This ensures the form layout is preserved
        }, 0);
      }

      // Update rate limit status without triggering new messages
      const submissions = getSubmissionHistory();
      const now = Date.now();
      const recentSubmissions = submissions.filter(
        (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
      );

      if (recentSubmissions.length >= RATE_LIMIT_MAX) {
        setIsRateLimited(true);
        const oldestSubmission = Math.min(...recentSubmissions);
        const resetTime = oldestSubmission + RATE_LIMIT_WINDOW;
        setTimeUntilReset(Math.ceil((resetTime - now) / 1000 / 60));
      } else {
        setIsRateLimited(false);
      }
    } catch (error) {
      console.log(error.text);
      setMessage("Failed to send message. Please try again. 😞");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while hydrating
  if (!isClient) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <div className="bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] bg-clip-text text-transparent font-medium text-lg">
            Loading contact form...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Clickable Email Address */}
      <div className="mb-8 text-center">
        <a
          href={`mailto:${siteContent.email.adress}`}
          className="bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] bg-clip-text text-transparent hover:from-[#6BB6FF] hover:to-[#4A90E2] transition-all duration-200 cursor-pointer font-medium text-lg"
        >
          {siteContent.email.adress}
        </a>
      </div>

      {/* Divider */}
      <div className="flex items-center my-8">
        <div className="flex-1 border-t border-gray-600"></div>
        <span className="px-4 text-gray-400 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-600"></div>
      </div>

      {/* Rate Limit Warning */}
      {isRateLimited && (
        <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
          <p className="text-yellow-400 text-sm text-center">
            ⚠️ You have reached the maximum number of messages ({RATE_LIMIT_MAX}
            ) per hour. Please wait {timeUntilReset} minutes before sending
            another message.
          </p>
        </div>
      )}

      {/* Contact Form */}
      <form ref={form} onSubmit={sendEmail} className="space-y-6 max-w-2xl">
        {/* Name Field */}
        <div className="w-full">
          <label
            htmlFor="from_name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="from_name"
            id="from_name"
            required
            disabled={isRateLimited}
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Your Name"
          />
        </div>

        {/* Email Field */}
        <div className="w-full">
          <label
            htmlFor="from_email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="from_email"
            id="from_email"
            required
            disabled={isRateLimited}
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="your@email.com"
          />
        </div>

        {/* Message Field */}
        <div className="w-full">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows="5"
            required
            disabled={isRateLimited}
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Your Message..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading || isRateLimited}
            className={`bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-[#4A90E2]/25 hover:scale-105 transition-all duration-200 ${
              isLoading || isRateLimited
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            {isLoading
              ? "Sending..."
              : isRateLimited
              ? "Rate Limited"
              : "Send Message"}
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <div className="text-center mt-4">
            <p
              className={`text-sm ${
                message.includes("successfully")
                  ? "text-green-400"
                  : message.includes("Rate limit")
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Email;
