import React from 'react';
import Layout from "../Components/Layouts/Layout.js";
import { Link } from 'react-router-dom';

const Policy = () => {
  return (
    <Layout title="Privacy Policy | E-Commerce App">
      <div className="container text-center mb-5">
        <div className="contact-container py-2 ">
          {/* <img src={contactImage} alt="Contact" className="contact-image" /> */}
          <div className="contact-details">
            <h2>Privacy Policy</h2>
            <p>
              Welcome to E-Commerce App. This page informs you of our policies regarding the collection, use, and disclosure of Personal Information we receive from users of the site.
            </p>
            <h3>Information Collection and Use</h3>
            <p>
              While using our site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your name, email address, postal address, and phone number ("Personal Information").
            </p>
            <h3>Log Data</h3>
            <p>
              Like many site operators, we collect information that your browser sends whenever you visit our site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
            </p>
            <h3>Cookies</h3>
            <p>
              Cookies are files with small amounts of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.
            </p>
            <h3>Security</h3>
            <p>
              The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>
            <h3>Changes to This Privacy Policy</h3>
            <p>
              This Privacy Policy is effective as of [Date] and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
            </p>
            <p>
              We reserve the right to update or change our Privacy Policy at any time, and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
            </p>
            <h3>Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please <Link to='/contact'>Contact us</Link>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Policy;
