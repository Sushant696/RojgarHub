import useRouter from "@/lib/router";
import { Location } from "iconsax-react";
import { Clock, Mail, Phone } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<number | null>(0);

  const router = useRouter();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs: FAQ[] = [
    {
      question: "How do I apply for a job?",
      answer:
        "Browse our listings, click on a job that interests you, review the details, and click the 'Apply Now' button. Follow the instructions to submit your application.",
    },
    {
      question: "What happens after I submit my application?",
      answer:
        "Our recruitment team will review your application. If your qualifications match our requirements, we'll contact you to schedule an interview.",
    },
    {
      question: "How can I check the status of my application?",
      answer:
        "You can log into your account on our portal to check the status of all your applications.",
    },
    {
      question: "Do you offer remote work opportunities?",
      answer:
        "Yes, we have various remote, hybrid, and in-office positions. Each job listing specifies the work arrangement.",
    },
    {
      question: "How can I update my profile or resume?",
      answer:
        "Log into your account, navigate to your profile, and select 'Edit Profile' to update your information or upload a new resume.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <div className="bg-blue-600 py-6 md:py-8 px-4">
        <div className="">
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
            Contact Us
          </h1>
          <p className="text-blue-100 text-center mt-2 text-sm sm:text-base">
            We're here to help with your job search journey
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg  p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Thank you for your message! We'll get back to you soon.
              </div>
            ) : null}

            <form className="" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-2 sm:p-3 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 sm:p-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full p-2 sm:p-3 border ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full p-2 sm:p-3 border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-md transition duration-300 grid grid-flow-col items-center gap-2 justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 h-fit gap-6 md:gap-8">
            <div className="bg-blue-50 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
                  <div className="bg-blue-600 rounded-full p-2">
                    <Phone className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Phone</p>
                    <p className="text-gray-800">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
                  <div className="bg-blue-600 rounded-full p-2">
                    <Mail className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Email</p>
                    <p className="text-gray-800 break-words">
                      support@jobportal.com
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
                  <div className="bg-blue-600 rounded-full p-2">
                    <Location className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Office</p>
                    <p className="text-gray-800">
                      123 Career Street, Talent City, TC 10001
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
                  <div className="bg-blue-600 rounded-full p-2">
                    <Clock className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Hours</p>
                    <p className="text-gray-800">Monday - Friday: 9AM - 5PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:py-8 section-margin">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
              >
                <button
                  className="grid grid-cols-[1fr_auto] items-center w-full text-left font-medium text-gray-800 hover:text-blue-600 focus:outline-none gap-2"
                  onClick={() =>
                    setActiveTab(activeTab === index ? null : index)
                  }
                  type="button"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${activeTab === index ? "transform rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {activeTab === index && (
                  <div className="mt-3 text-gray-600 text-sm sm:text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Connecting Banner */}
      <div className="bg-blue-600 py-8 md:py-12 px-4 mt-8 md:mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 md:mb-4">
            Ready to find your dream job?
          </h2>
          <p className="text-blue-100 mb-6 md:mb-8 text-sm sm:text-base">
            Browse our job listings or let us know how we can assist with your
            career journey.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <button
              className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-md transition duration-300"
              type="button"
              onClick={() => {
                router.push("/apply");
              }}
            >
              Browse Jobs
            </button>
            <button
              className="bg-blue-700 text-white hover:bg-blue-800 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-md transition duration-300"
              type="button"
              onClick={() => {
                router.push("/register");
              }}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
