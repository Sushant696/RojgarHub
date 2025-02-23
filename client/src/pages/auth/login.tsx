import { Link } from "@tanstack/react-router";
import { useFormik } from "formik";
import { motion } from "motion/react";
import {
  Building2,
  Briefcase,
  ArrowRight,
  Search,
  UserCircle2,
  KeyRound,
} from "lucide-react";
import { useLogin } from "@/hooks/auth";

const Login = ({ onSwitch }: { onSwitch: () => void }) => {
  const loginMutation = useLogin();
  const formik = useFormik({
    initialValues: {
      phoneNo: "",
      password: "",
    },
    onSubmit: (values) => {
      loginMutation.mutate(values);
      console.log(values);
    },
  });

  return (
    <div className="min-h-[85vh] md:min-h-[85vh]  w-full bg-[#f0f6ff] flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-52 md:h-64 bg-gradient-to-b from-blue-600 to-blue-500" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full sm:max-w-6xl relative bottom-20"
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -left-20 top-20 w-72 bg-white rounded-2xl p-4 shadow-xl transform -rotate-6 z-0 hidden lg:block"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Senior Developer</h3>
              <p className="text-sm text-gray-500">Google Inc.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4" />
            <span>Remote • Full-time</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute -right-16 bottom-20 w-72 bg-white rounded-2xl p-4 shadow-xl transform rotate-6 hidden lg:block"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">UI/UX Designer</h3>
              <p className="text-sm text-gray-500">Apple Inc.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4" />
            <span>On-site • Full-time</span>
          </div>
        </motion.div>

        {/* Main Login Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Form */}
            <div className="p-6 md:p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Welcome back
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Your next career move starts here
                  </p>
                </div>

                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <UserCircle2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="phoneNo"
                        className="w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your phone number"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNo}
                      />
                    </div>

                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        id="password"
                        className="w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 md:py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200"
                  >
                    Sign in to your account
                  </motion.button>

                  <div className="text-center">
                    <Link
                      to="/register"
                      onClick={onSwitch}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group"
                    >
                      New to JobHub? Create an account
                      <ArrowRight
                        className="group-hover:translate-x-1 transition-transform"
                        size={20}
                      />
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side - Job Search Preview - Hidden on mobile */}
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 p-8 lg:p-12 text-white overflow-hidden hidden md:block">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">Find your dream job</h3>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-8">
                  <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70"
                      placeholder="Search jobs..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70"
                      placeholder="Location"
                    />
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white/70">
                      <option>Job Type</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">10,000+ Companies</h4>
                      <p className="text-blue-100">
                        Find opportunities from startups to tech giants
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Remote Jobs</h4>
                      <p className="text-blue-100">
                        Work from anywhere in the world
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
};

export default Login;
