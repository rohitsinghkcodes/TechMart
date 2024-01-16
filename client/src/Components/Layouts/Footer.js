import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // <div className=" text-light p-3 footer">
    //   <h4 className="text-center">
    //     All rights reserved &copy; ROHIT KUMAR SINGH
    //   </h4>
    //   <p className="text-center at-3">
    //     <Link to="/about">About</Link>   |  
    //     <Link to="/contact">Contact</Link>  | 
    //     <Link to="/policy">Privacy Policy</Link>
    //   </p>
    // </div>
    <footer className=" footer py-4 mt-4">
  <ul className="nav justify-content-center border-dark  mb-3">
    
    <li className="nav-item"><Link to="/about">About</Link></li>
    <li className="nav-item"><Link to="/contact">Contact</Link></li>
    <li className="nav-item"><Link to="/policy">Privacy Policy</Link></li>
  </ul>
  <hr className="mx-5"/>
  <h5 className="text-center text-muted text-light">All rights reserved &copy; ROHIT KUMAR SINGH</h5>
</footer>

  );
};

export default Footer;
