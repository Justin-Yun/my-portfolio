'use client';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { siteContent } from "../app/content"; // Adjust the path as necessary

const Email = () => {
  const form = useRef();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Using environment variables for security
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      console.log(result.text);
      setMessage('Message sent successfully! 🎉');
      form.current.reset();
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error.text);
      setMessage('Failed to send message. Please try again. 😞');
      setIsLoading(false);
    });
  };

// console.log('EmailJS Config:');
// console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
// console.log('Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
// console.log('Public Key:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  
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

      {/* Contact Form */}
      <form ref={form} onSubmit={sendEmail} className="space-y-6">
        {/* Name Field */}
        <div>
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
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Your Name"
          />
        </div>

        {/* Email Field */}
        <div>
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
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="your@email.com"
          />
        </div>

        {/* Message Field */}
        <div>
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
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Your Message..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-[#4A90E2]/25 hover:scale-105 transition-all duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <div className="text-center mt-4">
            <p className={`text-sm ${
              message.includes('successfully') ? 'text-green-400' : 'text-red-400'
            }`}>
              {message}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Email;