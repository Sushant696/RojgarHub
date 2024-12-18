import React from "react";
import { FaFacebookSquare, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="border bg-blue-50 mt-20 py-8">
      <div className="container flex justify-around  flex-wrap">
        {/* logo and company details*/}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {/*
          <div className="">
            <img src="/tempLogo.png" className="w-20 h-20" alt="temp logo" />
          </div>*/}
            <div>
              <h1 className="emphasized-text text-blue-950">ROJGAR</h1>
              <h1 className="regular-text text-blue-950 ">Hub Pvt. Ltd</h1>
            </div>
          </div>
          <h1 className="w-3/6">Slogan for the rogar hub will be here</h1>
        </div>

        <div className="flex-1">
          <div>
            <h2>First Item</h2>
            <h2>Second Item</h2>
            <h2>Third Item</h2>
          </div>
        </div>
        <div className="flex-1">
          <div>
            <h2>First Item</h2>
            <h2>Second Item</h2>
            <h2>Third Item</h2>
          </div>
        </div>
        <div className="flex-1">
          <div>
            <h2>First Item</h2>
            <h2>Second Item</h2>
            <h2>Third Item</h2>
          </div>
        </div>
        <div className="flex-1">
          <div>Download App</div>
          <div className="flex justify-center gap-3">
            <div className="rounded-lg p-8 border w-full">Android</div>
            <div className="rounded-lg p-8 border w-full">IOS</div>
          </div>
        </div>
      </div>
      <div className="my-8">
        <hr />
      </div>
      <div className="flex justify-center items-center gap-4 my-5">
        <FaFacebookSquare className="text-blue-600" size={26} />
        <FaLinkedin className="text-blue-600" size={26} />
        <FaWhatsappSquare className="text-blue-600" size={26} />
      </div>
      <div className="text-center mb-4">
        Copyright &copy; | 2025 | RojgarHub Pvt.Ltd
      </div>
    </div>
  );
}

export default Footer;
