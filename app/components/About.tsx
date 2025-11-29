import { BookOpen } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            About GEC Bilaspur
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Established in 1964, GEC Bilaspur has produced generations of skilled engineers contributing to global innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-700 mb-6">
              To be a global leader in quality technical education and research for the betterment of society.
            </p>

            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Develop technical competencies and entrepreneurship.</li>
              <li>• Promote research and consultancy for industries.</li>
              <li>• Instill ethical values and leadership for sustainability.</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Academic Programs</h3>
            <div className="space-y-3">
              {[
                "Civil Engineering",
                "Mechanical Engineering",
                "Electrical Engineering",
                "Mining Engineering",
                "Electronics & Telecommunication",
                "Computer Science & Engineering",
                "Information Technology",
                "M.Tech in Thermal Engineering",
              ].map((prog) => (
                <div key={prog} className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span>{prog}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
