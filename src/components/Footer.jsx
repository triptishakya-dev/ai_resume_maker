import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-center py-4 mt-10 rounded-t-2xl shadow-md">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} Made by{" "}
        <span className="font-semibold text-gradient">Tripti Shakya</span>.
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
