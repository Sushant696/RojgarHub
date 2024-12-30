function EmployerLogin() {
  return (
    <div className="flex items-center justify-center section-margin">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="emphasized-text font-bold text-center mb-6 text-color-dark">
          Employer Dashboard Login
        </h1>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 small-text mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700  small-text mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center small-text text-gray-600 mt-4">
          Forgot password?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
}

export default EmployerLogin;
