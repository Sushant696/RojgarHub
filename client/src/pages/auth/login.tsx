import { Link } from "@tanstack/react-router";
import { ArrowRight } from "iconsax-react";
import {
  FaFacebook,
  FaGithub,
  FaUser,
  FaChartLine,
  FaShieldAlt,
  FaSync,
} from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useFormik } from "formik";

import { userLoginSchema } from "./schemas";
import { useLogin } from "../../hooks/auth";

interface LoginProps {
  onSwitch: () => void;
}

interface FormDataTypes {
  phoneNo: string;
  password: string;
}

function Login({ onSwitch }: LoginProps) {
  const loginMutation = useLogin();

  const formik = useFormik({
    initialValues: {
      phoneNo: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: (values: FormDataTypes) => {
      formik.resetForm();
      loginMutation.mutate(values);
    },
  });

  if (loginMutation.isPending) {
    return <h1>Loading..</h1>;
  }

  return (
    <div className="flex">
      <div className="justify-self-start flex-grow flex items-center justify-center ">
        <div className="w-full">
          {/* left section*/}
          <div className="flex flex-col lg:flex-row w-full bg-white rounded-2xl shadow-lg overflow-hidden">
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

            <div className="lg:w-1/2 p-12 lg:p-20">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-800">
                    Login to Your Account
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Please enter your credentials to continue
                  </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="phoneNo"
                      className="block small-text font-medium text-gray-700 mb-2"
                    >
                      UserID
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-600" size={18} />
                      </div>
                      <input
                        type="text"
                        id="phoneNo"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNo}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                        placeholder="Enter your mobile number"
                      />
                    </div>
                    {formik.touched.phoneNo && formik.errors.phoneNo && (
                      <div className="text-red-500 text-sm mt-1">
                        Phone number must be 10 digits
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block small-text font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <RiLockPasswordFill
                          className="text-gray-600"
                          size={18}
                        />
                      </div>
                      <input
                        type="password"
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                        placeholder="Enter your password"
                      />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out">
                    {loginMutation.isPending ? "Signing in" : "Sign in"}
                  </button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center small-text">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg small-text hover:bg-gray-50 transition duration-150 ease-in-out">
                      <FaFacebook color="#1877F2" size={24} />
                      Facebook
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg small-text hover:bg-gray-50 transition duration-150 ease-in-out">
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
      <div className="w-1/4 flex justify-center items-center">
        <Link
          onClick={onSwitch}
          href="/register"
          className="flex items-center gap-4"
        >
          Create new account <ArrowRight variant="Bulk" size={32} />
        </Link>
      </div>
    </div>
  );
}

export default Login;
