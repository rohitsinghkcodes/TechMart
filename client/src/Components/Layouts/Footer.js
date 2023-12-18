import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark text-light p-3 footer">
      <h4 className="text-center">
        All rights reserved &copy; ROHIT KUMAR SINGH
      </h4>
      <br/>
      <p className="text-center at-3">
        <Link to="/about">About</Link>   |  
        <Link to="/about">Contact</Link>  | 
        <Link to="/about">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
