"use client";
import React from "react";
import dynamic from "next/dynamic";
import PageTransition from "@/components/PageTransition";
import PortraitPhoto from "@/components/PortraitPhoto";
import { motion } from "framer-motion";
import Link from "next/link";

// Dynamically import ScrollLink with no SSR
const ScrollLink = dynamic(
  () => import("react-scroll").then((mod) => mod.Link),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <PageTransition>
      <section id="home" className="h-[85vh] flex items-center justify-center">
        <div className="text-center">
          <PortraitPhoto />
          <h1 className="text-5xl font-bold mb-6">Justin Yun</h1>
          <p className="text-xl mb-8">Software Engineer</p>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            offset={-80}
            className="bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-[#4A90E2]/25 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            Learn More
          </ScrollLink>
        </div>
      </section>

      {/* About */}
      <section id="about" className="h-[85vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="text-lg max-w-2xl mx-auto">
            I am a passionate software engineer with a focus on building
            scalable web applications. My expertise lies in full-stack
            development, and I love creating intuitive user experiences.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="h-[85vh] flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">Experience</h2>
          <p className="text-lg max-w-2xl mx-auto">Experience</p>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="h-[85vh] flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">Projects</h2>
          <p className="text-lg max-w-2xl mx-auto">Projects</p>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="h-[85vh] flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">Contact Info</h2>
          <p className="text-lg max-w-2xl mx-auto">Add Contact Info Here</p>
          <Link
            href="../files/Justin_Yun_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-[#4A90E2]/25 hover:scale-105 transition-all duration-200 cursor-pointer inline-block"
          >
            Resume
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
