import { useState } from "react";
import SearchComponent from "../../components/SearchComponent";
import SearchComponentMobile from "../../components/mobileSearch";
import SearchResults from "@/components/searchResults";

function Hero() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const hasResults = searchResults && searchResults.length > 0;

  return (
    <>
      <div className="w-full main-color-hero border border-white">
        <div className="container">
          <div className="text-center pt-20">
            <h1 className="title-text leading:!leading-5 lg:!leading-[70px] tracking-wide">
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
            <SearchComponentMobile
              setSearchResults={setSearchResults}
              bgColor={"bg-[#F4F7FD]"}
            />
          </div>
          <div className="hidden lg:block section-margin">
            <SearchComponent
              setSearchResults={setSearchResults}
              bgColor={"bg-[#F4F7FD]"}
            />
          </div>

          {/* Display search results if there are any */}
          {hasResults && (
            <div className="mt-8 pb-12">
              <SearchResults jobs={searchResults} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Hero;
