"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

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
import { signinSchema } from "@/lib/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type LoginFormData = {
  email: string;
  password: string;
  role : "alumni" | "admin";
};

export default function LoginForm() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
      role : "alumni"
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const loadingToast = toast.loading("Signing in...");
    try {
      console.log("Login attempt:", data);
      const res = await signIn("credentials" , {
        ...data,
        role: "alumni",
        redirect : false
      });
      toast.dismiss(loadingToast);
      if(res?.ok){
        toast.success("Sign in successfull");
        router.push("/");
      }
      else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      toast.error("Sign in failed");
      console.error("Login error:", error);
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

            {/* Desktop Navigation */}
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

            {/* Desktop Register Button */}
            <Link href="/register" className="hidden md:block">
              <Button className="bg-blue-600 hover:bg-blue-700">Register</Button>
            </Link>

            {/* Mobile Menu Toggle */}
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
        </div>
      </header>

      {/* Login Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your GEC Bilaspur Alumni account</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password *</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>

                <div className="text-center text-sm text-gray-600 pt-4">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                    Register here
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
