import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center space-x-8 mb-8">
          <Image src="/Logo.png" width={96} height={96} alt="Alumni Logo" />
          <Image src="/CollegeLogo.png" width={96} height={96} alt="College Logo" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to GEC Bilaspur Alumni Network
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Connecting generations of engineers since 1964. Join our community of accomplished professionals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-semibold">
              Register Now
            </button>
          </Link>
          <Link href="/Directory">
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 hover:text-white font-semibold">
              Alumni Directory
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
