import React from "react";
import SearchComponent from "../../components/SearchComponent";
import SearchComponentMobile from "../../components/mobileSearch";

const popularSearches = [
  "software Developer",
  "Receptionist",
  "UI/UX Designer",
  "Devops Engineer",
];

function Hero() {
  return (
    <div className="w-full bg-[#F4F7FD]">
      <div className="container">
        <div className="text-center pt-16">
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

        <h1>Top rated company or something like that</h1>

        <div className="border my-12 h-[480px]">
          <h1 className="emphasized-text">Latest Job Post</h1>
          <p>
            Explore the different types of available jobs to apply discover
            which is right for you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
