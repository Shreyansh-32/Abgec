"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AlumniData {
  id: number;
  fullName: string;
  gradYear: number;
  branch: string;
  email: string;
  mobile: string;
  organisation: string;
  designation: string;
}

export default function AlumniDirectory() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [data, setData] = useState<AlumniData[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch alumni data from API
  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/alumni", {
        params: {
          search: searchTerm || undefined,
          year: filterYear || undefined,
          department: filterDepartment || undefined,
        },
      });
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching alumni:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlumni();
  }, [searchTerm, filterYear, filterDepartment]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
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

            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="/#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <a href="/#directory" className="text-gray-700 hover:text-blue-600 font-medium">Directory</a>
              <a href="/#events" className="text-gray-700 hover:text-blue-600 font-medium">Events</a>
              <a href="/#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            </nav>

            <Link href="/login" className="hidden md:block">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Login
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Directory</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Connect with alumni from GEC Bilaspur.
        </p>
      </section>

      {/* Directory Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search + Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name, email, company, or designation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:col-span-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />

            {/* Graduation Year (Number Input, Hide Spinners) */}
            <input
              type="number"
              min={1968}
              max={2030}
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              placeholder="Enter year"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none no-spinner w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />

            {/* Department Select (ShadCN) */}
            <Select onValueChange={setFilterDepartment} value={filterDepartment}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Cse">Computer Science & Engineering</SelectItem>
                <SelectItem value="Et&t">Electronics & Tele Communication</SelectItem>
                <SelectItem value="Mech">Mechanical Engineering</SelectItem>
                <SelectItem value="Civil">Civil Engineering</SelectItem>
                <SelectItem value="Elec">Electrical Engineering</SelectItem>
                <SelectItem value="Mining">Mining Engineering</SelectItem>
                <SelectItem value="It">Information Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Alumni Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <p className="p-6 text-center text-gray-500">Loading...</p>
            ) : data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Graduation Year</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Position</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((alumni) => (
                      <tr key={alumni.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{alumni.fullName}</td>
                        <td className="px-6 py-4">{alumni.gradYear}</td>
                        <td className="px-6 py-4">{alumni.branch}</td>
                        <td className="px-6 py-4">
                          <div>{alumni.email}</div>
                          <div className="text-gray-500">{alumni.mobile}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{alumni.designation}</div>
                          <div className="text-gray-500">{alumni.organisation}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="p-6 text-center text-gray-500">No alumni found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}