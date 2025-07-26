// components/PageTransition.js
import React from "react";

const PageTransition = ({ children }) => {
  return (
    <div className="min-h-screen animate-fadeIn">
      {children}
    </div>
  );
};

export default PageTransition;