import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                width={40}
                height={40}
                src="/CollegeLogo.png"
                alt="GEC Bilaspur"
                className="h-10 w-10"
              />
              <div>
                <h3 className="text-lg font-semibold">GEC Bilaspur Alumni</h3>
                <p className="text-gray-400 text-sm">Established 1964</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting generations of engineers and fostering lifelong
              relationships within the GEC Bilaspur community.
            </p>
            <p className="text-gray-400 text-sm">
              Affiliated with Chhattisgarh Swami Vivekanand Technical University
              (CSVTU), Bhilai.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/Directory" className="hover:text-white">
                  Alumni Directory
                </Link>
              </li>
              <li>
                <Link href="/#events" className="hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  News
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Career Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  College Website
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Academic Calendar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Library
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Research
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Government Engineering College Bilaspur
          Alumni Association. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
