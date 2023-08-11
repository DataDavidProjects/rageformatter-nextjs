import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-red-700 to-red-900 text-white py-6 mt-auto">
      <div className="container mx-auto text-center font-bold">
        <p>© {new Date().getFullYear()} RageFormatter 🍝</p>
      </div>
    </footer>
  );
};

export default Footer;
