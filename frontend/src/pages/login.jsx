import { Link } from "@tanstack/react-router";
import React from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";

function Login() {
  return (
    <div className="border border-black">
      <div class="min-h-screen m-[-60px] flex items-center justify-center">
        <div class="container max-w-7xl mx-auto">
          <div class="flex flex-col lg:flex-row w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="lg:w-1/2 bg-indigo-600 backdrop-blur-xl p-12 lg:p-20 flex flex-col justify-between text-white">
              <div class="">
                <h2 class="text-4xl font-bold mb-6">Welcome to rojgarHub!</h2>
                <p class="text-lg text-indigo-100 mb-8">
                  Log in to access your dashboard and continue your journey with
                  us.
                </p>
              </div>

              <div class="bg-indigo-700 p-6 rounded-xl">
                <p class="italic text-indigo-100">
                  "Rojgar hub is a great platform it helped me find my dream
                  job. Highly recommended for aspiring individuals seeking their
                  dream job."
                </p>
                <div class="mt-4 flex items-center">
                  <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-lg"></i>
                  </div>
                  <div class="ml-4">
                    <p class="font-semibold">Bibek Pandey</p>
                    <p class="text-sm text-indigo-200">Full stack developer</p>
                  </div>
                </div>
              </div>
              <div class="flex justify-center gap-4">
                <div class="p-1 bg-blue-300 rounded-xl w-6 h-[2px]"></div>
                <div class="p-1 bg-white rounded-xl w-6 h-[2px]"></div>
                <div class="p-1 bg-white rounded-xl w-6 h-[2px]"></div>
                <div class="p-1 bg-white rounded-xl w-6 h-[2px]"></div>
              </div>
            </div>
            <div class="lg:w-1/2 p-12 lg:p-20">
              <div class="max-w-md mx-auto">
                <div class="text-center mb-8">
                  <h3 class="text-3xl font-bold text-gray-800">
                    Login to Your Account
                  </h3>
                  <p class="text-gray-500 mt-2">
                    Please enter your credentials to continue
                  </p>
                </div>

                <form class="space-y-6">
                  <div>
                    <label
                      for="username"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Username
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-user text-gray-400"></i>
                      </div>
                      <input
                        type="text"
                        id="username"
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg"
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="password"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-lock text-gray-400"></i>
                      </div>
                      <input
                        type="password"
                        id="password"
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <a
                      href="#"
                      class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg"
                  >
                    Sign in
                  </button>
                </form>

                <div class="mt-6 text-center">
                  <p class="text-sm text-gray-600">
                    Don't have an account?
                    <Link
                      href="/register"
                      class="font-medium text-blue-400 hover:text-indigo-500"
                    >
                      {" "}
                      Sign up
                    </Link>
                  </p>
                </div>

                <div class="mt-8">
                  <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                      <span class="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div class="mt-4 grid grid-cols-2 gap-3">
                    <button class="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg small-text">
                      <FaFacebook color="#1877F2" size={24} />
                      Google
                    </button>
                    <button class="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg small-text">
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

export default Login;
