import { useCounterStore } from "../../stores/store";
import Hero from "./hero";
import { Helmet } from "react-helmet";

function Home() {
  const { count, incr } = useCounterStore();

  return (
    <div>
      <Helmet>
        <title>Home | RojgarHub</title>
      </Helmet>
      <Hero />
      hello Jobs of the day
      <h1>top recruiters</h1>
      incrementing statistics news and blogs subscribe to our newsletter
      <h1 onClick={incr}>{count}</h1>
    </div>
  );
}

export default Home;
