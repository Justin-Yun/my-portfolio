"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Justin-Yun", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/justin-yunn/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              Justin Yun
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Social Links & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 hover:bg-blue-50 rounded-lg"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <span>Hire Me</span>
              <ExternalLink size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-4 space-y-4 border-t border-gray-200/50">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Social Links */}
            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200/50">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
