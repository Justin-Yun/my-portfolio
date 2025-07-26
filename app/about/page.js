import React from "react";
import PageTransition from "../../components/PageTransition";

const About = () => {
  return (
    <PageTransition>
      <section
        id="about"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">About</h1>
          <p className="text-xl mb-8">Hello</p>
        </div>
      </section>
    </PageTransition>
  );
};

export default About;
