import React from "react";
function Hero() {
  return (
    <div className="w-full bg-[#F4F7FD]">
      <div className="container border border-gray-200">
        <div className="text-center my-12">
          <h1 className="title-text !leading-[70px] tracking-wide">
            There are
            <span className="text-blue-500"> 109,282 </span>
            Postings
            <br />
            <h1>Here for you</h1>
          </h1>
          <h2 className="regular-text my-3 opacity-70">
            Find Jobs, Employment & Career Opportunities
          </h2>
        </div>
        <div className="border text-center py-4 mx-20 rounded-lg my-20">
          Search component will be here in this part
        </div>

        <div className="border border-black h-[480px]">
          phone collage will be here{" "}
        </div>
      </div>
    </div>
  );
}

export default Hero;
