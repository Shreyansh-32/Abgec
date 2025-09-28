"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

interface FormData {
  name: string;
  batch: string;
  branch: string;
  email: string;
  mobile: string;
  organisation: string;
  designation: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    batch: "",
    branch: "",
    email: "",
    mobile: "",
    organisation: "",
    designation: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const validateForm = (): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.batch.trim()) newErrors.batch = "Batch is required";
    if (!formData.branch.trim()) newErrors.branch = "Branch is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Valid 10-digit mobile number is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      // Placeholder for API call
      // await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      setSubmitted(true);
      setFormData({
        name: "",
        batch: "",
        branch: "",
        email: "",
        mobile: "",
        organisation: "",
        designation: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Image
                width={100}
                height={100}
                src="/CollegeLogo.png"
                alt="GEC Bilaspur Logo"
                className="h-12 w-12"
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Alumni Association
                </h1>
                <p className="text-sm text-gray-600">
                  Government Engineering College Bilaspur
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </a>
              <a
                href="/#about"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                About
              </a>
              <a
                href="/Directory"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Directory
              </a>
              <a
                href="/#events"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Events
              </a>
              <a
                href="/#contact"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Contact
              </a>
            </nav>

            {/* Desktop Login Button */}
            <Link href="/login" className="hidden md:block">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Login
              </button>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="/"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  Home
                </a>
                <a
                  href="/#about"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  About
                </a>
                <a
                  href="/#directory"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  Directory
                </a>
                <a
                  href="/#events"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  Events
                </a>
                <a
                  href="/#contact"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  Contact
                </a>
                <div className="px-3 py-2">
                  <Link href="/login">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-8 mb-8">
              <Image
                width={100}
                height={100}
                src="/Logo.png"
                alt="Alumni Club Logo"
                className="h-24 w-24"
              />
              <Image
                width={100}
                height={100}
                src="/CollegeLogo.png"
                alt="College Logo"
                className="h-24 w-24"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Register to GEC Bilaspur Alumni Network
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Join our community of accomplished professionals and stay
              connected with your alma mater. Connect with fellow alumni and
              expand your network.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Complete Your Registration
          </h2>
          {submitted && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg border border-green-200">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Registration successful! Welcome to the GEC Bilaspur Alumni
                Network.
              </div>
            </div>
          )}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-800 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition-colors placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="batch"
                    className="block text-sm font-medium text-gray-800 mb-2"
                  >
                    Graduation Year *
                  </label>
                  <input
                    type="text"
                    name="batch"
                    id="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition-colors placeholder-gray-400"
                    placeholder="e.g., 2020"
                  />
                  {errors.batch && (
                    <p className="mt-1 text-sm text-red-600">{errors.batch}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  Branch/Department *
                </label>
                <input
                  type="text"
                  name="branch"
                  id="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition-colors placeholder-gray-400"
                  placeholder="e.g., Computer Science & Engineering"
                />
                {errors.branch && (
                  <p className="mt-1 text-sm text-red-600">{errors.branch}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-800 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition-colors placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-800 mb-2"
                  >
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition-colors placeholder-gray-400"
                    placeholder="9876543210"
                  />
                  {errors.mobile && (
                    <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="organisation"
                    className="block text-sm font-medium text-gray-800 mb-2"
                  >
                    Current Organisation
                  </label>
                  <input
                    type="text"
                    name="organisation"
                    id="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition-colors placeholder-gray-400"
                    placeholder="Company/Organization name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-800 mb-2"
                  >
                    Current Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition-colors placeholder-gray-400"
                    placeholder="Your job title/position"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors font-semibold text-lg"
                >
                  Join Alumni Network
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 pt-4">
                Already registered?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign in here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 ">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <Image
                width={100}
                height={100}
                src="/CollegeLogo.png"
                alt="GEC Bilaspur Logo"
                className="h-8 w-8"
              />
              <p className="text-lg font-semibold">
                GEC Bilaspur Alumni Association
              </p>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting generations of engineers since 1964
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              © 2025 Government Engineering College Bilaspur. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
