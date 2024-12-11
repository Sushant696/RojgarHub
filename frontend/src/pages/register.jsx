import React from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { SecurityUser } from "iconsax-react";
import { Link } from "@tanstack/react-router";

function Register() {
  return (
    <div>
      <div class="min-h-screen m-[-60px] flex items-center justify-center">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="lg:w-1/2 bg-indigo-600 p-12 lg:p-12 flex flex-col justify-between text-white">
              <div>
                <h2 class="text-3xl font-bold mb-4">Welcome to rojgarHub!</h2>
                <p class="text-regualr text-indigo-100 mb-6">
                  Register to start new and exciting journey with us.
                </p>
              </div>

              <div class="bg-indigo-700 p-4 rounded-lg">
                <p class="italic small-text text-indigo-100">
                  "Rojgar hub is a great platform it helped me find my dream
                  job. Highly recommended for aspiring individuals seeking their
                  dream job."
                </p>
                <div class="mt-3 flex items-center">
                  <div class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                    <SecurityUser size="50" color="#FFF" variant="Bulk" />
                  </div>
                  <div class="ml-3">
                    <p class="font-semibold text-emphasized">Bibek Pandey</p>
                    <p class="small-text text-indigo-200">
                      Full stack developer
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex justify-center gap-3 mt-6">
                <div class="p-0.5 bg-blue-300 rounded-full w-4"></div>
                <div class="p-0.5 bg-white rounded-full w-4"></div>
                <div class="p-0.5 bg-white rounded-full w-4"></div>
                <div class="p-0.5 bg-white rounded-full w-4"></div>
              </div>
            </div>

            <div class="lg:w-1/2 p-8 lg:p-12">
              <div class="max-w-md mx-auto">
                <div class="text-center mb-6">
                  <h3 class="text-2xl font-bold text-gray-800">
                    Create Your Account
                  </h3>
                  <p class="small-text text-gray-500 mt-1">
                    Please fill in your details to register
                  </p>
                </div>

                <form id="registrationForm" class="space-y-6">
                  <div>
                    <label
                      for="username"
                      class="block small-text font-medium text-gray-700 mb-1"
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
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg small-text"
                        placeholder="Choose your username"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="email"
                      class="block small-text font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-envelope text-gray-400"></i>
                      </div>
                      <input
                        type="email"
                        id="email"
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg small-text"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="password"
                      class="block small-text font-medium text-gray-700 mb-1"
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
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg small-text"
                        placeholder="Create your password"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="confirm-password"
                      class="block small-text font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-lock text-gray-400"></i>
                      </div>
                      <input
                        type="password"
                        id="confirm-password"
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg small-text"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg small-text hover:bg-indigo-700"
                  >
                    Create Account
                  </button>
                </form>

                <div class="mt-6">
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

                <div class="text-center mt-6">
                  <p class="small-text text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" class="text-indigo-400 font-medium">
                      Sign in
                    </Link>
                  </p>
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
