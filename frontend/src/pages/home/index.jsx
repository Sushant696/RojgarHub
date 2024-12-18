import React from "react";
import Hero from "./hero";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Hero Section | RojgarHub</title>
      </Helmet>
      <Hero />
      Jobs of the day
      <h1>top recruiters</h1>
      incrementing statistics news and blogs subscribe to our newsletter
    </div>
  );
}

export default Home;
