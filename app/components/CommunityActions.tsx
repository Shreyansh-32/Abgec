"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Award, Lightbulb, Users } from "lucide-react";

interface ActionCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}

export default function CommunityActions() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCardClick = (dialogType: string) => {
    if (session?.user) {
      router.push(`/profile?dialog=${dialogType}`);
    } else {
      router.push("/login");
    }
  };

  const actions: ActionCard[] = [
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Become a Mentor",
      description: "Share your expertise and guide the next generation of engineers",
      action: "Start Mentoring",
    },
    {
      icon: <Award className="h-12 w-12 text-green-600" />,
      title: "Share Achievement",
      description: "Showcase your accomplishments and inspire the community",
      action: "Share Now",
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-purple-600" />,
      title: "Share Opportunity",
      description: "Post job openings and opportunities for alumni and students",
      action: "Post Opportunity",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Involved</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Contribute to the community and make a lasting impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actions.map((action, index) => {
            const dialogTypes = ["mentor", "achievement", "opportunity"];
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-4">{action.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {action.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">{action.description}</p>
                <button
                  onClick={() => handleCardClick(dialogTypes[index])}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-semibold transition-colors duration-200"
                >
                  {action.action}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
