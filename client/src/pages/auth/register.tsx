import {
  FaFacebook,
  FaGithub,
  FaChartLine,
  FaLock,
  FaShieldAlt,
  FaSync,
  FaUser,
} from "react-icons/fa";

import { useState } from "react";
import { useFormik } from "formik";
import { Mobile } from "iconsax-react";
import { IoMail } from "react-icons/io5";
import { ArrowLeft } from "iconsax-react";
import { Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

import { authApi } from "../../api/user";
import useRouter from "../../lib/router";
import { registerSchema } from "./schemas";
import showNotification from "../../utils/toastify";
import ToggleUser from "../../components/toggleButton";

interface RegisterProps {
  onSwitch: () => void;
}

interface FormDataTypes {
  username: string;
  email: string;
  contact: string;
  password: string;
}

function Register({ onSwitch }: RegisterProps) {
  const { push } = useRouter();
  const [currentUser, setCurrentUser] = useState("candidate");

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (values: FormDataTypes) =>
      authApi.Register(values, currentUser),
    onSuccess: () => {
      formik.resetForm();
      showNotification("success", "User registered Successfully");
      push("/login");
    },
    onError: (error) => {
      showNotification("success", error.message || "Something went wrong.");
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      contact: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="flex">
      <div className="w-1/4 flex justify-center items-center">
        <Link
          href="/login"
          onClick={onSwitch}
          className="flex items-center gap-2"
        >
          <ArrowLeft variant="Bulk" size={24} />
          Login
        </Link>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="w-full px-2">
          <div className="flex flex-col lg:flex-row w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="lg:w-6/12 p-4 lg:p-6">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-4">
                  <h3 className="emphasized-text font-bold text-gray-800 text-xl">
                    Create Your Account
                  </h3>
                  <p className="small-text text-gray-500 mt-1 small-text">
                    Please fill in your details to register
                  </p>
                  <div className="mt-3 mb-4">
                    <ToggleUser setCurrentUser={setCurrentUser} />
                  </div>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="username"
                      className="block small-text font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-600" size={16} />
                      </div>
                      <input
                        type="text"
                        id="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg small-text"
                        placeholder="Enter your Full Name"
                      />
                    </div>
                  </div>
                  <div className="flex  gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block small-text font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IoMail className="text-gray-600" size={16} />
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
                        htmlFor="contact"
                        className="block small-text font-medium text-gray-700 mb-1"
                      >
                        Mobile Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mobile
                            variant="Bold"
                            className="text-gray-600"
                            size={16}
                          />
                        </div>
                        <input
                          type="text"
                          id="contact"
                          onChange={formik.handleChange}
                          value={formik.values.contact}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg small-text"
                          placeholder="Enter your Mobile number"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block small-text font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-600" size={16} />
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
                      htmlFor="confirmPassword"
                      className="block small-text font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-600" size={16} />
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
                    disabled={isPending}
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg small-text hover:bg-indigo-700"
                  >
                    {isPending ? "Creating" : "Create Account"}
                  </button>
                </form>

                <div className="relative mt-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center small-text">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-1.5 border border-gray-300 rounded-lg small-text">
                      <FaFacebook color="#1877F2" size={20} />
                      Google
                    </button>
                    <button className="flex items-center justify-center gap-2 py-1.5 border border-gray-300 rounded-lg small-text">
                      <FaGithub size={20} />
                      GitHub
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side with adjusted padding */}
            <div className="lg:w-1/2 bg-indigo-600 flex flex-col justify-between text-white py-6 px-6">
              <div>
                <h2 className="subtitle-text font-bold mb-4">
                  Welcome to rojgarHub!
                </h2>
                <p className="text-indigo-100 mb-6">
                  Log in to access your dashboard and continue your journey with
                  us.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-500 p-2 rounded-lg">
                      <FaChartLine className="text-lg" />
                    </div>
                    <p className="small-text">Real-time Job Tracking</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-500 p-2 rounded-lg">
                      <FaShieldAlt className="text-lg" />
                    </div>
                    <p className="small-text">Secure Application Process</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-500 p-2 rounded-lg">
                      <FaSync className="text-lg" />
                    </div>
                    <p className="small-text">Automatic Profile Updates</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-700 p-4 rounded-xl mt-4">
                <p className="italic text-indigo-100 mb-3 small-text">
                  "Rojgar hub is a great platform it helped me find my dream
                  job."
                </p>

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                    <FaUser className="small-text" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold regular-text">Bibek Pandey</p>
                    <p className="small-text text-indigo-200">
                      Full stack developer
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-4">
                <div className="p-1 bg-blue-300 rounded-xl w-4 h-[2px]"></div>
                <div className="p-1 bg-white rounded-xl w-4 h-[2px]"></div>
                <div className="p-1 bg-white rounded-xl w-4 h-[2px]"></div>
                <div className="p-1 bg-white rounded-xl w-4 h-[2px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
