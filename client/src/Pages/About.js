import React from "react";
import Layout from "../Components/Layouts/Layout.js";

const About = () => {
  return (
    <Layout title="About E-Commerce App">
      <div className="container text-center mb-5">
        <div className="contact-container ">
          <div className="contact-details">
            <h2>About Our E-Commerce App</h2>
            <p>
              Welcome to E-Commerce App, your go-to destination for all your online shopping needs. At [Your Ecommerce App Name], we are committed to providing you with a seamless and enjoyable shopping experience.
            </p>
            <h3>Our Mission</h3>
            <p>
              Our mission is to connect people with the products they love. We strive to offer a diverse selection of high-quality products, exceptional customer service, and a user-friendly platform that makes shopping online easy and fun.
            </p>
            <h3>What Sets Us Apart</h3>
            <p>
              At E-Commerce, we stand out from the rest with our dedication to customer satisfaction. Here are some key features that set us apart:
            </p>
            <ul>
              <li>Wide Range of Products: Explore a vast collection of products across various categories.</li>
              <li>Quality Assurance: We ensure that all products meet high-quality standards.</li>
              <li>Secure and Convenient Shopping: Shop with confidence through our secure and user-friendly platform.</li>
              <li>Fast and Reliable Delivery: Enjoy prompt and reliable delivery services.</li>
              <li>Exceptional Customer Support: Our friendly support team is here to assist you with any inquiries or concerns.</li>
            </ul>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
