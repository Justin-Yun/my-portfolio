"use client";
import React, { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const navItems = [
    { name: "Home", scrollTo: "home" },
    { name: "About", scrollTo: "about" },
    { name: "Experience", scrollTo: "experience" },
    { name: "Projects", scrollTo: "projects" },
    { name: "Contact", scrollTo: "contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Justin-Yun", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/justin-yunn/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      label: "Email",
      scrollTo: "contact",
    },
  ];

  const scrollProps = {
    smooth: true,
    duration: 500,
    offset: -80,
    spy: true,
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const renderNavLink = (item) => {
    return (
      <ScrollLink
        key={item.name}
        to={item.scrollTo}
        {...scrollProps}
        className="text-[#F5F5F5] hover:text-[#4A90E2] font-medium transition-colors duration-200 relative group cursor-pointer"
      >
        {item.name}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90E2] transition-all duration-300 group-hover:w-full"></span>
      </ScrollLink>
    );
  };

  const renderMobileNavLink = (item) => {
    return (
      <ScrollLink
        key={item.name}
        to={item.scrollTo}
        {...scrollProps}
        onClick={() => setIsMenuOpen(false)}
        className="block text-[#F5F5F5] hover:text-[#4A90E2] font-medium py-3 px-4 rounded-lg hover:bg-[#1A1A1A]/50 transition-colors duration-200 cursor-pointer"
      >
        {item.name}
      </ScrollLink>
    );
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#2D2D2D]/90 backdrop-blur-md border-b border-[#1A1A1A]/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-20 relative">
          <div className="flex-shrink-0">
            <ScrollLink
              to="home"
              {...scrollProps}
              className="text-xl md:text-3xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] bg-clip-text text-transparent hover:from-[#6BB6FF] hover:to-[#4A90E2] transition-all duration-300 cursor-pointer"
            >
              Justin Yun
            </ScrollLink>
          </div>

          {/* Desktop Navigation - Absolutely Centered */}
          <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => renderNavLink(item))}
          </nav>

          {/* Desktop Social Links & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) =>
                social.scrollTo ? (
                  <ScrollLink
                    key={social.label}
                    to={social.scrollTo}
                    {...scrollProps}
                    className="text-[#F5F5F5]/70 hover:text-[#4A90E2] transition-colors duration-200 p-2 hover:bg-[#1A1A1A]/50 rounded-lg cursor-pointer"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </ScrollLink>
                ) : (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F5F5F5]/70 hover:text-[#4A90E2] transition-colors duration-200 p-2 hover:bg-[#1A1A1A]/50 rounded-lg"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                )
              )}
            </div>
            <div className="w-px h-6 bg-[#F5F5F5]/20 mx-2"></div>
            <Link
              href="../files/Justin_Yun_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-[#4A90E2]/25 hover:scale-105 transition-all duration-200 cursor-pointer inline-block"
            >
              Resume
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#F5F5F5] hover:text-[#4A90E2] hover:bg-[#1A1A1A]/50 rounded-lg transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-6 space-y-2 border-t border-[#1A1A1A]/50 text-center">
            {navItems.map((item) => renderMobileNavLink(item))}

            {/* Mobile Social Links */}
            <div className="flex items-center justify-center space-x-6 pt-6 border-t border-[#1A1A1A]/50">
              {socialLinks.map((social) =>
                social.scrollTo ? (
                  <ScrollLink
                    key={social.label}
                    to={social.scrollTo}
                    {...scrollProps}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#F5F5F5]/70 hover:text-[#4A90E2] transition-colors duration-200 p-2 cursor-pointer"
                    aria-label={social.label}
                  >
                    <social.icon size={22} />
                  </ScrollLink>
                ) : (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F5F5F5]/70 hover:text-[#4A90E2] transition-colors duration-200 p-2"
                    aria-label={social.label}
                  >
                    <social.icon size={22} />
                  </a>
                )
              )}
            </div>

            {/* Mobile Resume Button */}
            <div className="pt-4">
              <Link
                href="../files/Justin_Yun_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-[#4A90E2]/25 transition-all duration-200 cursor-pointer inline-block"
              >
                Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}