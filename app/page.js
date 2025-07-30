"use client";
import React from "react";
import dynamic from "next/dynamic";
import PageTransition from "@/components/PageTransition";
import PortraitPhoto from "@/components/PortraitPhoto";
import Email from "@/components/Email";
import { ProjectsGrid } from "@/components/Project";
import { siteContent } from "./content"; // Import your content

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
      <section
        id="home"
        className="min-h-screen py-16 md:py-20 px-4 flex items-start justify-center pt-24 md:pt-28"
      >
        <div className="text-center">
          <title>Justin Yun - Software Engineer Portfolio</title>
          <meta name="Justin Yun Portfolio" content="Justin Yun's Portfolio" />
          <PortraitPhoto />
          <h1 className="text-5xl font-bold mb-4">Justin Yun</h1>
          <p className="text-xl mb-4">{siteContent.about.location}</p>
          <p className="text-xl mb-8">{siteContent.about.role}</p>
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
      <section
        id="about"
        className="min-h-screen py-16 md:py-20 px-4 flex items-center justify-center"
      >
        <div className="bg-[#0d1117] text-white p-8 rounded-lg shadow-lg max-w-4xl mx-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg max-w-2xl mx-auto">
              {siteContent.about.description}
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="min-h-screen py-16 md:py-20 px-4 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="bg-[#0d1117] text-white p-8 rounded-lg shadow-lg max-w-4xl mx-4">
            <h2 className="text-4xl font-bold mb-8">Experience</h2>
            <div className="max-w-2xl mx-auto">
              {siteContent.experience.map((job, index) => (
                <div
                  key={index}
                  className="mb-8 text-left border-l-4 border-blue-400 pl-6"
                >
                  <h3 className="text-xl font-bold">{job.company}</h3>
                  <h4 className="text-lg text-blue-400">{job.position}</h4>
                  <h4 className="text-lg text-blue-400">{job.location}</h4>
                  <p className="text-gray-400 mb-2">{job.duration}</p>
                  <p className="text-gray-300 whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="min-h-screen py-16 md:py-20 px-4 flex items-center justify-center"
      >
        <div className="text-center w-full max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
          <ProjectsGrid projects={siteContent.projects} />
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="min-h-screen py-16 md:py-20 px-4 flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-6xl font-bold mb-8">Let&apos;s Connect!</h2>{" "}
          <Email />
          {/* <Link
            href="../files/Justin_Yun_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-[#4A90E2]/25 hover:scale-105 transition-all duration-200 cursor-pointer inline-block"
          >
            Resume
          </Link> */}
        </div>
      </section>
    </PageTransition>
  );
}
