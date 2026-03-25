import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PaginatedMentors from "../components/PaginatedMentors";

export const dynamic = "force-dynamic";

export default function MentorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-white py-12 shadow-sm">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-bold text-gray-900">Mentors</h1>
          <p className="mt-2 text-sm text-gray-600">
            Alumni ready to guide students and fellow graduates.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <PaginatedMentors />
      </main>

      <Footer />
    </div>
  );
}
