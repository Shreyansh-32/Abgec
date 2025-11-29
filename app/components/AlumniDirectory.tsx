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

import { Button } from "@/components/ui/button";

interface AlumniData {
  id: number;
  fullName: string;
  gradYear: number;
  branch: string;
  email: string;
  mobile: string;
  organisation: string;
  designation: string;
  location?: string | null;
  profilePicture?: string | null;
}

export default function AlumniDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");

  const [data, setData] = useState<AlumniData[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  // Generate years from 2030 down to 1968
  const years = Array.from({ length: 2030 - 1968 + 1 }, (_, i) => 2030 - i);

  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/alumni", {
        params: {
          search: searchTerm || undefined,
          year: filterYear || undefined,
          department: filterDepartment || undefined,
          page,
          limit,
        },
      });

      setData(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlumni();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filterYear, filterDepartment, page]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const gotoPage = (p: number) => {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href={"/"} className="cursor-pointer">
                <Image 
                  src="/CollegeLogo.png" 
                  alt="Logo" 
                  width={48} 
                  height={48} 
                  className="rounded-md" 
                />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Alumni Association</h1>
                <p className="text-sm text-gray-600">Government Engineering College Bilaspur</p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/#about" className="hover:text-blue-600">About</Link>
              <Link href="/Directory" className="hover:text-blue-600">Directory</Link>
              <Link href="/#events" className="hover:text-blue-600">Events</Link>
              <Link href="/#contact" className="hover:text-blue-600">Contact</Link>
            </nav>

            <Link href="/login" className="hidden md:block">
              <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Directory</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Explore the diverse alumni network of GEC Bilaspur.
        </p>
      </section>

      {/* Directory List */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by name, email, company..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="md:col-span-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Year Select Dropdown */}
            <Select
              value={filterYear ? filterYear : "all"}
              onValueChange={(v) => {
                setFilterYear(v === "all" ? "" : v);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Graduation Year" />
              </SelectTrigger>
              <SelectContent className="max-h-[250px] overflow-y-auto">
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Department Select Dropdown */}
            <Select
              value={filterDepartment}
              onValueChange={(v) => {
                setFilterDepartment(v);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Cse">Computer Science</SelectItem>
                <SelectItem value="Et&t">ET&T</SelectItem>
                <SelectItem value="Mech">Mechanical</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
                <SelectItem value="Elec">Electrical</SelectItem>
                <SelectItem value="Mining">Mining</SelectItem>
                <SelectItem value="It">IT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Alumni List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <p className="text-center p-6 text-gray-500">Loading directory...</p>
            ) : data.length > 0 ? (
              data.map((alumni) => (
                <div
                  key={alumni.id}
                  className="flex items-center gap-6 p-5 border-b hover:bg-gray-50 transition"
                >
                  {/* Profile Picture */}
                  <div className="flex-shrink-0">
                    {alumni.profilePicture ? (
                      <Image
                        src={alumni.profilePicture}
                        alt="Profile"
                        width={80}
                        height={80}
                        className="rounded-full object-cover h-20 w-20"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-2xl font-semibold">
                          {alumni.fullName?.[0] || "?"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">{alumni.fullName}</h2>
                    <p className="text-sm text-gray-600">
                      {alumni.designation} {alumni.organisation && `• ${alumni.organisation}`}
                    </p>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                      <div>
                        <span className="font-medium text-gray-900">Graduation:</span> {alumni.gradYear}
                        <br />
                        <span className="font-medium text-gray-900">Branch:</span> {alumni.branch}
                      </div>

                      <div>
                        <span className="font-medium text-gray-900">Email:</span> {alumni.email}
                        <br />
                        <span className="font-medium text-gray-900">Phone:</span> {alumni.mobile}
                      </div>

                      <div>
                        <span className="font-medium text-gray-900">Location:</span>{" "}
                        {alumni.location || "—"}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No alumni found matching your criteria.</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchTerm("");
                    setFilterYear("");
                    setFilterDepartment("all");
                  }}
                  className="mt-2 text-blue-600"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {total > 0 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-gray-600 text-sm">
                Showing {Math.min((page - 1) * limit + 1, total)} –{" "}
                {Math.min(page * limit, total)} of {total}
              </p>

              <div className="flex gap-2">
                <Button variant="outline" disabled={page <= 1} onClick={() => gotoPage(page - 1)}>
                  Prev
                </Button>

                <div className="hidden md:flex gap-1">
                  {[...Array(totalPages)].slice(Math.max(0, page - 3), page + 2).map((_, idx) => {
                    const pageNum = idx + Math.max(1, page - 2);
                    if (pageNum > totalPages) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => gotoPage(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors ${
                          pageNum === page
                            ? "bg-blue-600 text-white font-medium"
                            : "border border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <Button variant="outline" disabled={page >= totalPages} onClick={() => gotoPage(page + 1)}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}