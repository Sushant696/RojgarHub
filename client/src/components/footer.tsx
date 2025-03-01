import { FaFacebookSquare, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import { FaAndroid, FaApple } from "react-icons/fa";

function Footer() {
  return (
    <div className="border-t-4 border-blue-400 bg-blue-50 mt-20 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and company details */}
          <div className="mb-8 lg:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div>
                <h1 className="text-2xl font-bold text-blue-950">ROJGAR</h1>
                <h1 className="text-xl text-blue-950">Hub Pvt. Ltd</h1>
                <div className="w-16 h-1 bg-blue-400 mt-2"></div>
              </div>
            </div>
            <p className="text-gray-700 mb-4">Slogan for the Rojgar Hub will be here</p>
          </div>

          {/* Navigation Links */}
          <div className="mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Contact Us</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">About Us</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Blogs and Articles</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Terms of Service</a></li>
            </ul>
          </div>

          <div className="mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">Job Seekers</h3>
            <ul className="space-y-2">
              <li><a href="/apply" className="text-gray-700 hover:text-blue-600 transition">Find Jobs</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Post a Resume</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Job Categories</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Interview Tips</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">FAQs</a></li>
            </ul>
          </div>

          <div className="mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">Employers</h3>
            <ul className="space-y-2">
              <li><a href="/login" className="text-gray-700 hover:text-blue-600 transition">Post a Job</a></li>
              <li><a href="/login" className="text-gray-700 hover:text-blue-600 transition">Employer Login</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Plans and Pricing</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Applicant Tracking</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Employer FAQs</a></li>
            </ul>
          </div>

          {/* Download App Section */}
          <div className="mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">Download App</h3>
            <div className="grid grid-cols-2 gap-3">
              <a href="#" className="flex flex-col items-center justify-center rounded-lg p-3 border border-blue-300 bg-white hover:bg-blue-100 transition">
                <FaAndroid className="text-blue-500 mb-2" size={24} />
                <span className="text-sm text-gray-700">Android</span>
              </a>
              <a href="#" className="flex flex-col items-center justify-center rounded-lg p-3 border border-blue-300 bg-white hover:bg-blue-100 transition">
                <FaApple className="text-blue-500 mb-2" size={24} />
                <span className="text-sm text-gray-700">iOS</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 container mx-auto px-4">
        <hr className="border-blue-200" />
      </div>

      {/* Social Media Icons */}
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-4 mb-6">
          <a href="#" className="hover:scale-110 transition">
            <FaFacebookSquare className="text-blue-600" size={28} />
          </a>
          <a href="#" className="hover:scale-110 transition">
            <FaLinkedin className="text-blue-600" size={28} />
          </a>
          <a href="#" className="hover:scale-110 transition">
            <FaXTwitter size={28} />
          </a>
          <a href="#" className="hover:scale-110 transition">
            <FaWhatsappSquare className="text-blue-600" size={28} />
          </a>
          <a href="#" className="hover:scale-110 transition">
            <FaSquareInstagram className="text-blue-600" size={28} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-700 px-4">
        Copyright &copy; | 2025 | RojgarHub Pvt.Ltd
      </div>
    </div>
  );
}

export default Footer;