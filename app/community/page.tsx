import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommunityCarousel from "./components/CommunityCarousel";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-gradient-to-r from-blue-50 via-white to-blue-100 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Community Spotlight
          </p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
            Mentors, opportunities, and achievements
          </h1>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Browse everything alumni are sharing across the community.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/community/opportunities">View opportunities</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/community/mentors">Find mentors</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/community/achievements">See achievements</Link>
            </Button>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-14">
        <CommunityCarousel />
      </main>

      <Footer />
    </div>
  );
}
