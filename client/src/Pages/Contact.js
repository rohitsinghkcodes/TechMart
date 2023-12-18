// Contact.js
import React from 'react';
import Layout from "../Components/Layouts/Layout.js";
import contactImage from "../images/contact.png"; 

const Contact = () => {
  return (
    <Layout>
      <div className="container text-center">
        <div className="contact-container">
          <img src={contactImage} alt="Contact" className="contact-image" />
          <div className="contact-details">
            <h2>Contact Details:</h2>
            <p>Email: example@example.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Main Street, City, Country</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
