import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PaginatedAchievements from "../components/PaginatedAchievements";

export const dynamic = "force-dynamic";

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-white py-12 shadow-sm">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
          <p className="mt-2 text-sm text-gray-600">
            Celebrate what alumni are accomplishing across industries.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <PaginatedAchievements />
      </main>

      <Footer />
    </div>
  );
}
