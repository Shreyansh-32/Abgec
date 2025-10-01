"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/zod";
import axios, { isAxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormData = {
  fullName: string;
  gradYear: number;
  branch: string;
  email: string;
  mobile: number;
  organisation: string;
  designation: string;
  password: string;
  role: "alumni" | "admin";
};

export default function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      gradYear: 1968,
      branch: "",
      email: "",
      mobile: 1234567890,
      organisation: "",
      designation: "",
      password: "",
      role: "alumni",
    },
  });

  const onSubmit = async (data: FormData) => {
    const loading = toast.loading("Registering...");
    console.log(JSON.stringify(data));
    try {
      setSubmitted(true);
      const res = await axios.post("/api/auth" , {
        email : data.email,
        fullName : data.fullName,
        password : data.password,
        gradYear : data.gradYear,
        organisation : data.organisation,
        designation : data.designation,
        branch : data.branch,
        mobile : data.mobile
      });
      if(res.status === 200){
        toast.dismiss(loading);
        toast.success("Registeration completed!");
        router.push("/");
      }
      form.reset();
    } catch (error) {
      toast.dismiss(loading);
      if(isAxiosError(error)){
        toast.error(error.response?.data.message);
        console.log(error);
      }
      else{
        toast.error("Something went wrong!");
      }
    }
    finally{
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </a>
              <a href="/#about" className="text-gray-700 hover:text-blue-600 font-medium">
                About
              </a>
              <a href="/Directory" className="text-gray-700 hover:text-blue-600 font-medium">
                Directory
              </a>
              <a href="/#events" className="text-gray-700 hover:text-blue-600 font-medium">
                Events
              </a>
              <a href="/#contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </a>
            </nav>

            <Link href="/login" className="hidden md:block">
              <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-8 mb-8">
            <Image width={100} height={100} src="/Logo.png" alt="Alumni Club Logo" className="h-24 w-24" />
            <Image width={100} height={100} src="/CollegeLogo.png" alt="College Logo" className="h-24 w-24" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Register to GEC Bilaspur Alumni Network
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join our community of accomplished professionals and stay connected with your alma mater.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12 bg-gray-50 text-black">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Complete Your Registration
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Grad Year + Branch */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="gradYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduation Year *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1968}
                            max={2030}
                            placeholder="e.g., 2020"
                            {...field}
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch / Department *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Cse">Computer Science & Engineering</SelectItem>
                            <SelectItem value="Et&t">Electronics & Tele Communication</SelectItem>
                            <SelectItem value="Mech">Mechanical Engineering</SelectItem>
                            <SelectItem value="Civil">Civil Engineering</SelectItem>
                            <SelectItem value="Elec">Electrical Engineering</SelectItem>
                            <SelectItem value="Mining">Mining Engineering</SelectItem>
                            <SelectItem value="It">Information Technology</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email + Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="9876543210"
                            {...field}
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Organisation + Designation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="organisation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Organisation</FormLabel>
                        <FormControl>
                          <Input placeholder="Company/Organization name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Designation</FormLabel>
                        <FormControl>
                          <Input placeholder="Your job title/position" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter a password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Join Alumni Network
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 GEC Bilaspur Alumni Association. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
