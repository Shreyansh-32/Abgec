import { ExternalLink } from "lucide-react";

export default function Events() {
  const events = [
    {
      date: "Dec 15, 2025",
      title: "Annual Alumni Meet 2025",
      desc: "Reconnect with classmates and celebrate achievements.",
    },
    {
      date: "Nov 20, 2025",
      title: "Industry Connect Program",
      desc: "Mentorship program connecting students with professionals.",
    },
    {
      date: "Oct 30, 2025",
      title: "Diamond Jubilee Celebrations",
      desc: "Celebrating 60+ years of excellence in education.",
    },
  ];

  return (
    <section id="events" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Latest News & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((e) => (
            <div key={e.title} className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-sm text-blue-600 mb-2">{e.date}</div>
              <h3 className="text-lg font-semibold mb-3">{e.title}</h3>
              <p className="text-gray-600 mb-4">{e.desc}</p>
              <a
                href="#"
                className="text-blue-600 font-medium hover:text-blue-700 flex items-center justify-center"
              >
                Read More <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
