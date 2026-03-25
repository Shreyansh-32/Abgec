"use client";

import { useEffect, useState } from "react";

import PaginationControls from "./PaginationControls";
import UserCardHeader from "./UserCardHeader";
import type { AchievementSummary } from "./types";

export default function PaginatedAchievements() {
  const [data, setData] = useState<AchievementSummary[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 6;

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/achievements?page=${page}&limit=${limit}`);
        const json = await res.json();
        setData(json.data || []);
        setTotal(json.total || 0);
      } catch (error) {
        console.error("Failed to load achievements", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">
          Loading achievements...
        </div>
      ) : data.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">
          No achievements shared yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {data.map((achievement) => (
            <div
              key={achievement.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <UserCardHeader user={achievement.user} />
              <p className="mt-4 text-sm text-gray-700">
                {achievement.achievement}
              </p>
              <p className="mt-3 text-xs text-gray-500">
                {achievement.user.location || "Location not shared"}
              </p>
            </div>
          ))}
        </div>
      )}

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={(nextPage) => {
          setPage(nextPage);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
