import TopRecruiters from "@/components/TopRecruiters";
import Hero from "./hero";
import { Helmet } from "react-helmet";
import IncrementingStatistics from "@/components/IncrementingStatistics";
import Newsletter from "@/components/Newsletter";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | RojgarHub</title>
        <meta
          name="description"
          content="Find your dream job with RojgarHub - the leading job portal with over 100,000 job opportunities across industries."
        />
      </Helmet>

      <Hero />

      <TopRecruiters />

      <IncrementingStatistics />

      <Newsletter />
    </div>
  );
}

export default Home;
