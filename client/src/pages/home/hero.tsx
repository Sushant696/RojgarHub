import JobsOfTheDay from "../../components/JobsOfTheDay";
import SearchComponent from "../../components/SearchComponent";
import TrustedBy from "../../components/TrustedBy";
import SearchComponentMobile from "../../components/mobileSearch";

const popularSearches = [
  "software Developer",
  "Receptionist",
  "UI/UX Designer",
  "Devops Engineer",
];

function Hero() {
  return (
    <>
      <div className="w-full bg-[#F4F7FD] pb-40">
        <div className="container">
          <div className="text-center pt-12">
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
          <div className="block lg:hidden">
            <SearchComponentMobile />
          </div>
          <div className="hidden lg:block">
            <SearchComponent />
          </div>
          <div className="flex justify-center mt-4 gap-2">
            {popularSearches.map((item, index) => (
              <h1 key={index} className="underline">
                {item}
                {popularSearches.length - 1 > index && ","}
              </h1>
            ))}
          </div>
        </div>
        <TrustedBy />
      </div>
      <div className="relative border">
        <svg
          className="absolute bottom-[-20px] left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#3b82f6"
            fillOpacity="1"
            d="M0,224L80,208C160,192,320,160,480,160C640,160,800,192,960,208C1120,224,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>{" "}
      Discover Your Calling
      <JobsOfTheDay />
    </>
  );
}

export default Hero;
