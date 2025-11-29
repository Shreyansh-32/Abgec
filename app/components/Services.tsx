import { Users, Calendar, Award } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Alumni Directory",
      desc: "Connect with graduates and expand your professional network.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Events & Reunions",
      desc: "Stay updated on reunions and special college events.",
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Career Support",
      desc: "Get access to mentorship, job opportunities, and guidance.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Alumni Services</h2>
        <p className="text-lg text-gray-600 mb-12">
          Stay connected and engaged with your alma mater
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {s.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
