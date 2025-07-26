import React from "react";

const Background = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        backgroundImage: "url('/images/8bit.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default Background;
