import { useState } from "react";
import { useFormik } from "formik";
import { Building3, Eye, Mobile } from "iconsax-react";
import { IoMail } from "react-icons/io5";
import { ArrowLeft } from "iconsax-react";
import { Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/user";
import useRouter from "../../lib/router";
import { registerSchema } from "./schemas";
import showNotification from "../../utils/toastify";
import ToggleUser from "../../components/toggleButton";
import DisplayErrorToast from "../../utils/displayErrorMessage";
import { EyeOff } from "lucide-react";
import {
  FaChartLine,
  FaLock,
  FaShieldAlt,
  FaSync,
  FaUser,
} from "react-icons/fa";
import { motion } from "motion/react";

interface RegisterProps {
  onSwitch: () => void;
}

interface FormDataTypes {
  username?: string;
  email: string;
  contact: string;
  password: string;
}

function Register({ onSwitch }: RegisterProps) {
  const { push } = useRouter();
  const [currentUser, setCurrentUser] = useState("candidate");
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
      DisplayErrorToast(error);
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
    <div className="min-h-[90vh] md:min-h-[95vh] w-full bg-[#f0f6ff] flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-52 md:h-64 bg-gradient-to-b from-blue-600 to-blue-500" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl relative bottom-4"
      >
        {/* Main Register Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Form */}
            <div className="p-6 md:p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Create Your Account
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Your next career move starts here
                  </p>
                </div>

                <div className="flex justify-center mb-6">
                  <ToggleUser setCurrentUser={setCurrentUser} />
                </div>

                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  {/* Username Input */}
                  <div className="relative">
                    {currentUser === "candidate" ? (
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    ) : (
                      <Building3 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    )}
                    <input
                      type="text"
                      id="username"
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      className={`w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50 border ${formik.touched.username && formik.errors.username
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-gray-200"
                        } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder={
                        currentUser === "candidate"
                          ? "Enter your Full Name"
                          : "Enter Your Company Name"
                      }
                    />
                    {formik.touched.username && formik.errors.username && (
                      <p className="mt-2 text-red-500 text-sm">
                        {formik.errors.username}
                      </p>
                    )}
                  </div>

                  {/* Email and Contact Inputs */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2 relative">
                      <IoMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={`w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50 border ${formik.touched.email && formik.errors.email
                            ? "border-red-500 ring-1 ring-red-500"
                            : "border-gray-200"
                          } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        placeholder="Enter your email"
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="mt-2 text-red-500 text-sm">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 relative">
                      <Mobile className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="contact"
                        name="contact"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contact}
                        className={`w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50 border ${formik.touched.contact && formik.errors.contact
                            ? "border-red-500 ring-1 ring-red-500"
                            : "border-gray-200"
                          } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        placeholder="Enter your Mobile number"
                      />
                      {formik.touched.contact && formik.errors.contact && (
                        <p className="mt-2 text-red-500 text-sm">
                          {formik.errors.contact}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="space-y-4">
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <div className="flex items-center">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          className={`w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50 border ${formik.touched.password && formik.errors.password
                              ? "border-red-500 ring-1 ring-red-500"
                              : "border-gray-200"
                            } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                          placeholder="Create your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <Eye size={20} />
                          ) : (
                            <EyeOff size={20} />
                          )}
                        </button>
                      </div>
                      {formik.touched.password && formik.errors.password && (
                        <p className="mt-2 text-red-500 text-sm">
                          {formik.errors.password}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <div className="flex items-center">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirmPassword}
                          className={`w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50 border ${formik.touched.confirmPassword &&
                              formik.errors.confirmPassword
                              ? "border-red-500 ring-1 ring-red-500"
                              : "border-gray-200"
                            } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <Eye size={20} />
                          ) : (
                            <EyeOff size={20} />
                          )}
                        </button>
                      </div>
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                          <p className="mt-2 text-red-500 text-sm">
                            {formik.errors.confirmPassword}
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-600 text-white py-3 md:py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200"
                  >
                    {isPending ? "Creating Account..." : "Create Account"}
                  </motion.button>

                  <div className="text-center">
                    <Link
                      to="/login"
                      onClick={onSwitch}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group"
                    >
                      Already have an account? Sign in
                      <ArrowLeft
                        className="group-hover:-translate-x-1 transition-transform"
                        size={20}
                      />
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side - Features Section - Hidden on mobile */}
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 p-8 lg:p-12 text-white overflow-hidden hidden md:block">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">Why Join Us?</h3>

                {/* Benefits Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <FaChartLine size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Real-time Job Tracking</h4>
                      <p className="text-blue-100">
                        Track your applications and get updates in real-time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <FaShieldAlt size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Secure & Private</h4>
                      <p className="text-blue-100">
                        Your data is always protected with advanced security.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <FaSync size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Auto Profile Updates</h4>
                      <p className="text-blue-100">
                        Keep your profile updated and visible to employers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testimonials Section */}
                <div className="bg-blue-700 p-6 rounded-xl mt-8">
                  <p className="italic text-blue-100 mb-4">
                    "This platform helped me land my dream job as a developer.
                    The process was seamless and efficient!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaUser className="text-lg" />
                    </div>
                    <div>
                      <p className="font-medium">Bibek Pandey</p>
                      <p className="text-blue-200 text-sm">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call-to-Action */}
                <div className="mt-8 text-center">
                  <p className="text-blue-100 mb-4">
                    Join thousands of job seekers and start your journey today!
                  </p>
                  <button
                    className="bg-white text-blue-600 py-2 px-6 rounded-lg font-medium hover:bg-blue-100 transition-all duration-200"
                    onClick={onSwitch}
                  >
                    Explore Jobs
                  </button>
                </div>
              </div>

              {/* Background Grid Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <pattern
                    id="grid"
                    x="0"
                    y="0"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </pattern>
                  <rect
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    fill="url(#grid)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
