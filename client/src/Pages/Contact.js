import React from "react";
import Layout from "../Components/Layouts/Layout.js";
import contactImage from "../images/contact.png";

const Contact = () => {
  return (
    <Layout title="Contact | E-Commerce App">
      <div className="container text-center">
        <div className="contact-container">
          <img src={contactImage} alt="Contact" className="contact-image" />
          <div className="contact-details">
            <h2>Contact Details:</h2>
            <p>
              Feel free to reach out to us for any inquiries or assistance.
              We're here to help!
            </p>
            <p>
              <strong>Email:</strong> example@example.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p>
              <strong>Address:</strong> 123 Main Street, City, Country
            </p>
          </div>
        </div>
       
      </div>
    </Layout>
  );
};

export default Contact;
