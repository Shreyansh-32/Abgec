import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { User } from "lucide-react";
import { authOptions } from "@/lib/options";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
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
            <h1 className="md:text-lg font-semibold text-gray-900">
              Alumni Association
            </h1>
            <p className="text-sm text-gray-600">
              Government Engineering College Bilaspur
            </p>
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          {!session ? (
            <>
              <Link href="/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 hover:text-white">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <Link href="/profile">
              <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                <User className="h-6 w-6" />
                <span className="hidden sm:inline font-medium">Profile</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
