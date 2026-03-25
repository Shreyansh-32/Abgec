"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import UserCardHeader from "./UserCardHeader";
import type {
  AchievementSummary,
  MentorSummary,
  OpportunitySummary,
} from "./types";

const carouselLimit = 6;

export default function CommunityCarousel() {
  const [mentors, setMentors] = useState<MentorSummary[]>([]);
  const [achievements, setAchievements] = useState<AchievementSummary[]>([]);
  const [opportunities, setOpportunities] = useState<OpportunitySummary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorRes, achievementRes, opportunityRes] = await Promise.all([
          fetch(`/api/mentors?limit=${carouselLimit}`),
          fetch(`/api/achievements?limit=${carouselLimit}`),
          fetch(`/api/opportunities?limit=${carouselLimit}`),
        ]);

        const mentorData = await mentorRes.json();
        const achievementData = await achievementRes.json();
        const opportunityData = await opportunityRes.json();

        setMentors(mentorData.data || []);
        setAchievements(achievementData.data || []);
        setOpportunities(opportunityData.data || []);
      } catch (error) {
        console.error("Failed to load community data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-12">
      <CarouselSection
        title="Mentors"
        description="Experienced alumni offering guidance."
        href="/community/mentors"
        items={mentors}
        renderItem={(item) => (
          <div className="card">
            <UserCardHeader user={item.user} />
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Domain:</span> {item.domain}
              </p>
              <p>
                <span className="font-semibold">Paid:</span>{" "}
                {item.isPaid ? "Yes" : "No"}
              </p>
            </div>
          </div>
        )}
      />

      <CarouselSection
        title="Opportunities"
        description="Jobs and internships shared by alumni."
        href="/community/opportunities"
        items={opportunities}
        renderItem={(item) => (
          <div className="card">
            <UserCardHeader user={item.user} />
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p className="text-base font-semibold text-gray-900">
                {item.jobTitle}
              </p>
              <p>
                {item.companyName} • {item.jobType}
              </p>
              <p>{item.remotePosition ? "Remote" : "On-site"}</p>
            </div>
          </div>
        )}
      />

      <CarouselSection
        title="Achievements"
        description="Milestones shared by the alumni community."
        href="/community/achievements"
        items={achievements}
        renderItem={(item) => (
          <div className="card">
            <UserCardHeader user={item.user} />
            <p className="mt-4 text-sm text-gray-700">{item.achievement}</p>
          </div>
        )}
      />
    </div>
  );
}

function CarouselSection<T>({
  title,
  description,
  href,
  items,
  renderItem,
}: {
  title: string;
  description: string;
  href: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}) {
  const loopItems = items.length > 0 ? [...items, ...items] : [];

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <Button asChild variant="outline">
          <Link href={href}>View all</Link>
        </Button>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {loopItems.length === 0 ? (
            <div className="card flex items-center justify-center text-sm text-gray-500">
              No entries yet.
            </div>
          ) : (
            loopItems.map((item, index) => (
              <div key={index} className="card-wrapper">
                {renderItem(item)}
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .marquee {
          overflow: hidden;
          position: relative;
        }
        .marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: scroll 28s linear infinite;
        }
        .card-wrapper {
          width: 280px;
          flex-shrink: 0;
        }
        .card {
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          padding: 16px;
          box-shadow: 0 10px 30px -20px rgba(15, 23, 42, 0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px -22px rgba(37, 99, 235, 0.4);
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
