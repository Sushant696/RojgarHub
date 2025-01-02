import JobsOfTheDay from "../../components/JobsOfTheDay";
import SearchComponent from "../../components/SearchComponent";
import TrustedBy from "../../components/TrustedBy";
import SearchComponentMobile from "../../components/mobileSearch";
import useAuthStore from "../../stores/authStore";
import Stats from "../../components/stats";

const popularSearches = [
  "software Developer",
  "Receptionist",
  "UI/UX Designer",
  "Devops Engineer",
];

function Hero() {
  const user = useAuthStore((state) => state.user);
  
  return (
    <>
      <div className=" w-full main-color-hero ">
        <div className="container">
          <div className="text-center pt-20">
            <h1 className="title-text  leading:!leading-5 lg:!leading-[70px] tracking-wide">
              There are
              <span className="text-blue-500"> 109,282 </span>
              Postings
              <br />
              <h1>Here for you</h1>
            </h1>
            <h2 className="regular-text my-4 opacity-60">
              Find Jobs, Employment & Career Opportunities
            </h2>
          </div>
          <div className="block lg:hidden section-margin">
            <SearchComponentMobile />
          </div>
          <div className="hidden lg:block section-margin">
            <SearchComponent />
            <div className="flex justify-center my-6 gap-2">
              {popularSearches.map((item, index) => (
                <h1 key={index} className="underline">
                  {item}
                  {popularSearches.length - 1 > index && ","}
                </h1>
              ))}
            </div>
          </div>
        </div>
        <Stats />
        <div className="z-50">
          <TrustedBy />
        </div>
      </div>
      <JobsOfTheDay />
      <h1 className="subtitle-text">
        Hello {user?.username} welcome to your dashboard
      </h1>
    </>
  );
}

export default Hero;
