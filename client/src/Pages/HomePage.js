import React from "react";
import Layout from "../Components/Layouts/Layout.js";
import { useAuth } from "../Context/authContext.js";

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;
