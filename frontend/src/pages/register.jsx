import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaChartLine,
  FaLock,
  FaShieldAlt,
  FaSync,
  FaUser,
} from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import { useFormik } from "formik";
import { IoMail } from "react-icons/io5";
import { ArrowLeft } from "iconsax-react";

function Register({ onSwitch }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      //May be toast with success message with login
      //post req will be done here

      console.log(values);
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
    },
  });

  return (
    <div className="flex">
      <div className="w-1/4 flex justify-center items-center">
        <Link
          href="/login"
          onClick={onSwitch}
          className="flex items-center gap-4"
        >
          <ArrowLeft variant="Bulk" size={32} />
          Login
        </Link>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="w-full px-4">
          <div className="flex flex-col lg:flex-row w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="lg:w-1/2 bg-indigo-600  flex flex-col justify-between text-white py-24 lg:py-10 px-10">
              <div>
                <h2 className="subtitle-text font-bold mb-6">
                  Welcome to rojgarHub!
                </h2>
                <p className="regular-text text-indigo-100 mb-8">
                  Log in to access your dashboard and continue your journey with
                  us.
                </p>

                {/* Feature List */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-500 p-3 rounded-lg">
                      <FaChartLine className="text-xl" />
                    </div>
                    <p className="text-lg">Real-time Job Tracking</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-500 p-3 rounded-lg">
                      <FaShieldAlt className="text-xl" />
                    </div>
                    <p className="text-lg">Secure Application Process</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-500 p-3 rounded-lg">
                      <FaSync className="text-xl" />
                    </div>
                    <p className="text-lg">Automatic Profile Updates</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-700 p-6 rounded-xl">
                <p className="italic text-indigo-100 mb-4">
                  "Rojgar hub is a great platform it helped me find my dream
                  job."
                </p>

                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-lg" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Bibek Pandey</p>
                    <p className="text-sm text-indigo-200">
                      Full stack developer
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <div className="p-1 bg-blue-300 rounded-xl w-6 h-[2px]"></div>
                <div className="p-1 bg-white rounded-xl w-6 h-[2px]"></div>
                <div className="p-1 bg-white rounded-xl w-6 h-[2px]"></div>
                <div className="p-1 bg-white rounded-xl w-6 h-[2px]"></div>
              </div>
            </div>

            {/* form part*/}

            <div className="lg:w-1/2 p-8 lg:p-8">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                  <h3 className="emphasized-text font-bold text-gray-800">
                    Create Your Account
                  </h3>
                  <p className="small-text text-gray-500 mt-1">
                    Please fill in your details to register
                  </p>
                </div>

                <form
                  onSubmit={formik.handleSubmit}
                  id="registrationForm"
                  className="space-y-6"
                >
                  <div>
                    <label
                      for="username"
                      className="block small-text font-medium text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-user text-gray-400"></i>

                        <FaUser className="text-gray-600" size={18} />
                      </div>
                      <input
                        type="text"
                        id="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg small-text"
                        placeholder="Choose your username"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="email"
                      className="block small-text font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-envelope text-gray-400"></i>
                        <IoMail className="text-gray-600" size={18} />
                      </div>
                      <input
                        type="email"
                        id="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg small-text"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="password"
                      className="block small-text font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-600" size={18} />
                      </div>
                      <input
                        type="password"
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg small-text"
                        placeholder="Create your password"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="confirm-password"
                      className="block small-text font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-600" size={18} />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg small-text"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg small-text hover:bg-indigo-700"
                  >
                    Create Account
                  </button>
                </form>

                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center small-text">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg small-text">
                      <FaFacebook color="#1877F2" size={24} />
                      Google
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg small-text">
                      <FaGithub size={24} />
                      GitHub
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
