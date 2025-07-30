import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Code, Database, Globe } from "lucide-react";

const Project = ({ project }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300 group">
      {/* Project Image */}
      <div className="relative h-48 w-full overflow-hidden mt-4">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title and Description */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Links */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                <Github size={16} />
                Code
              </Link>
            )}
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
              >
                <ExternalLink size={16} />
                Live
              </Link>
            )}
          </div>

          {/* Project Status */}
          <div className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                project.status === "completed"
                  ? "bg-green-500"
                  : project.status === "in-progress"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            />
            <span className="text-xs text-gray-400 capitalize">
              {project.status || "completed"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Projects Grid Component
const ProjectsGrid = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </div>
  );
};

const sampleProjects = [];

export default Project;
export { ProjectsGrid, sampleProjects };
