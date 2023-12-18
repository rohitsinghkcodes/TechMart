import React from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";

const layout = (props) => {
  return (
    <div>
      <Header />

      <main style={{ minHeight: "80vh" }}>{props.children}</main>

      <Footer />
    </div>
  );
};

export default layout;
