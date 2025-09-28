"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface AlumniData {
  id: number;
  name: string;
  graduationYear: number;
  department: string;
  email: string;
  mobile: string;
  currentOrganisation: string;
  currentDesignation: string;
}

// Stock alumni data
const stockAlumniData: AlumniData[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    graduationYear: 2015,
    department: "Computer Science & Engineering",
    email: "rahul.sharma@gmail.com",
    mobile: "9876543210",
    currentOrganisation: "Google",
    currentDesignation: "Software Engineer",
  },
  {
    id: 2,
    name: "Priya Patel",
    graduationYear: 2016,
    department: "Electronics & Communication Engineering",
    email: "priya.patel@yahoo.com",
    mobile: "9876543211",
    currentOrganisation: "Microsoft",
    currentDesignation: "Senior Developer",
  },
  {
    id: 3,
    name: "Amit Kumar",
    graduationYear: 2014,
    department: "Mechanical Engineering",
    email: "amit.kumar@outlook.com",
    mobile: "9876543212",
    currentOrganisation: "Tata Motors",
    currentDesignation: "Design Engineer",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    graduationYear: 2017,
    department: "Civil Engineering",
    email: "sneha.gupta@gmail.com",
    mobile: "9876543213",
    currentOrganisation: "L&T Construction",
    currentDesignation: "Project Manager",
  },
  {
    id: 5,
    name: "Vikash Singh",
    graduationYear: 2013,
    department: "Electrical Engineering",
    email: "vikash.singh@rediffmail.com",
    mobile: "9876543214",
    currentOrganisation: "BHEL",
    currentDesignation: "Senior Engineer",
  },
  {
    id: 6,
    name: "Anita Verma",
    graduationYear: 2018,
    department: "Information Technology",
    email: "anita.verma@gmail.com",
    mobile: "9876543215",
    currentOrganisation: "Amazon",
    currentDesignation: "Data Scientist",
  },
  {
    id: 7,
    name: "Rajesh Yadav",
    graduationYear: 2015,
    department: "Chemical Engineering",
    email: "rajesh.yadav@hotmail.com",
    mobile: "9876543216",
    currentOrganisation: "Reliance Industries",
    currentDesignation: "Process Engineer",
  },
  {
    id: 8,
    name: "Deepika Jain",
    graduationYear: 2019,
    department: "Biotechnology",
    email: "deepika.jain@gmail.com",
    mobile: "9876543217",
    currentOrganisation: "Biocon",
    currentDesignation: "Research Scientist",
  },
  {
    id: 9,
    name: "Manoj Tiwari",
    graduationYear: 2012,
    department: "Aerospace Engineering",
    email: "manoj.tiwari@isro.gov.in",
    mobile: "9876543218",
    currentOrganisation: "ISRO",
    currentDesignation: "Scientist",
  },
  {
    id: 10,
    name: "Kavya Reddy",
    graduationYear: 2020,
    department: "Computer Science & Engineering",
    email: "kavya.reddy@gmail.com",
    mobile: "9876543219",
    currentOrganisation: "Netflix",
    currentDesignation: "Frontend Developer",
  },
  {
    id: 11,
    name: "Suresh Agarwal",
    graduationYear: 2011,
    department: "Mechanical Engineering",
    email: "suresh.agarwal@bajaj.com",
    mobile: "9876543220",
    currentOrganisation: "Bajaj Auto",
    currentDesignation: "Chief Engineer",
  },
  {
    id: 12,
    name: "Neha Chopra",
    graduationYear: 2021,
    department: "Electronics & Communication Engineering",
    email: "neha.chopra@intel.com",
    mobile: "9876543221",
    currentOrganisation: "Intel",
    currentDesignation: "Hardware Engineer",
  },
];

export default function AlumniDirectory() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  // Get unique graduation years and departments for filters
  const graduationYears = [
    ...new Set(stockAlumniData.map((alumni) => alumni.graduationYear)),
  ].sort((a, b) => b - a);
  const departments = [
    ...new Set(stockAlumniData.map((alumni) => alumni.department)),
  ].sort();

  // Filter alumni data based on search and filters
  const filteredAlumni = stockAlumniData.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.currentOrganisation
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      alumni.currentDesignation
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesYear =
      filterYear === "" || alumni.graduationYear.toString() === filterYear;
    const matchesDepartment =
      filterDepartment === "" || alumni.department === filterDepartment;

    return matchesSearch && matchesYear && matchesDepartment;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header - Same navigation as other pages */}
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
                href="/#directory"
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
                  href="/"
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
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="px-4 sm:px-6 lg:px-8">
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
              Alumni Directory
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Connect with your fellow alumni from Government Engineering
              College Bilaspur. Find and reconnect with classmates and
              colleagues from your batch.
            </p>
          </div>
        </div>
      </section>

      {/* Directory Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="md:col-span-2">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Search Alumni
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name, email, company, or designation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition-colors placeholder-gray-500"
                />
              </div>

              {/* Graduation Year Filter */}
              <div>
                <label
                  htmlFor="year-filter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Graduation Year
                </label>
                <select
                  id="year-filter"
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition-colors"
                >
                  <option value="">All Years</option>
                  {graduationYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <label
                  htmlFor="department-filter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Department
                </label>
                <select
                  id="department-filter"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition-colors"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {filteredAlumni.length} of {stockAlumniData.length}{" "}
                alumni
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterYear("");
                  setFilterDepartment("");
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Alumni Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Graduation Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Position
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAlumni.length > 0 ? (
                    filteredAlumni.map((alumni) => (
                      <tr
                        key={alumni.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {alumni.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {alumni.graduationYear}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {alumni.department}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div>{alumni.email}</div>
                            <div className="text-gray-500">{alumni.mobile}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="font-medium">
                              {alumni.currentDesignation}
                            </div>
                            <div className="text-gray-500">
                              {alumni.currentOrganisation}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                            />
                          </svg>
                          <p className="text-lg font-medium text-gray-900 mb-2">
                            No alumni found
                          </p>
                          <p className="text-sm text-gray-500">
                            Try adjusting your search criteria or filters.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
