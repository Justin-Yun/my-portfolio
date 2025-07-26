import React from "react";
import PageTransition from "@/components/PageTransition";
import PortraitPhoto from "@/components/PortraitPhoto";


export default function Home() {
  return (
    <PageTransition>
      {/* Just add this one section to your existing content */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <PortraitPhoto />
          <h1 className="text-5xl font-bold mb-6">Justin Yun</h1>
          <p className="text-xl mb-8">Software Engineer</p>
        </div>
      </section>
    </PageTransition>
  );
}
