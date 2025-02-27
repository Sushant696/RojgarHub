import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="subtitle-text font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-300 mb-8">
            Get weekly updates on new job opportunities, career advice, and
            industry insights delivered directly to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-grow py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>

          {subscribed && (
            <div className="mt-4 p-2 text-sm bg-green-800 text-green-100 rounded-lg">
              Thank you for subscribing! You'll receive our next newsletter
              soon.
            </div>
          )}

          <p className="mt-6 text-xs text-gray-400">
            By subscribing, you agree to our Privacy Policy and consent to
            receive job-related emails. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
