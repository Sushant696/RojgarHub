import Hero from "./hero";
import { Helmet } from "react-helmet";

function Home() {
  console.log(process.env.API_URL);
  return (
    <div>
      <Helmet>
        <title>Home | RojgarHub</title>
      </Helmet>
      <Hero />
      hello
      {process.env.API_URL}
      Jobs of the day
      <h1>top recruiters</h1>
      incrementing statistics news and blogs subscribe to our newsletter
    </div>
  );
}

export default Home;
