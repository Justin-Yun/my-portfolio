export const siteContent = {
  about: {
    role: "Software Engineer",
    description:
      "I'm a Software Engineer with a Bachelor's in Computer Science from the University of Colorado Boulder and a strong background in building scalable internal tools and backend systems using technologies like Spring Boot, ServiceNow, and GitHub Actions. I've led infrastructure migrations, streamlined developer workflows, and integrated modern APIs to improve system performance and reliability. I'm passionate about continuous improvement and learning something new every day to grow both technically and professionally.",
    location: "Denver, CO",
  },

  experience: [
    {
      company: "Travelport",
      location: "Englewood, CO",
      position: "Software Engineer II",
      duration: "July 2020 - January 2025",
      description: [
        "Integrated GraphQL into an existing Spring Boot application to improve API efficiency, reduce response times by 20%, and simplify data handling for client applications. ",
        "Developed C++ load-injection simulators and a unified testing framework that enhanced performance, increased test reliability, and drove a 78% reduction in technical debt. ",
        "Engineered ServiceNow solutions including custom forms, workflows, and REST APIs; partnered with cross-functional teams in Agile cycles to deliver scalable solutions. ",
        "Consolidated 15+ ServiceNow forms by analyzing field usage, workflows, and activity logs—streamlining UX and reducing form maintenance overhead by 40%. ",
        "Led infrastructure migration from Team Foundation Server (TFS) to GitHub and built automated CI/CD pipelines using GitHub Actions, reducing deployment times and eliminating manual deployment errors.",
      ],
    },
    {
      company: "Travelport",
      location: "Englewood, CO",
      position: "Software Engineer Intern",
      duration: "May 2019 - August 2019",
      description: [
        "Developed and optimized test automation portals using ASP Classic, reducing page load times by 70% and eliminating QA workflow bottlenecks. ",
        "Built custom XML processing functions to streamline automated testing workflows, achieving 80% reduction in test execution time and substantially improving testing efficiency for development cycles.",
      ],
    },
    {
      company: "University of Colorado Boulder",
      location: "Boulder, CO",
      position: "IT Technician",
      duration: "June 2017 - May 2020",
      description: [
        "Maintained technology infrastructure across over 500 classrooms serving 35,000 students and faculty, achieving 99.2% equipment uptime through rigorous maintenance protocols. ",
        "Led annual refresh of over 200 workstations with updated software and security patches, coordinating with faculty to minimize disruptions. ",
        "Provided real-time technical support and troubleshooting for classroom technology, resolving support tickets weekly to minimize instructional downtime. ",
        "Delivered exceptional customer service by promptly addressing faculty and student technical issues, ensuring high satisfaction and uninterrupted learning environments.",
      ],
    },
  ],

  email: {
    adress: "justin.yun.0@gmail.com",
  },

  projects: [
    {
      title: "Chiyu",
      description:
        "A modern, responsive artwork portfolio website built with Next.js featuring particle animations, smooth scrolling, and dynamic content.",
      image: "/images/project/chiyu.png",
      technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
      githubUrl: "https://github.com/Justin-Yun/Chiyu-Next",
      liveUrl: "https://chiyu-next.vercel.app/",
      status: "completed",
    },
    // Add more projects...
  ],
};
