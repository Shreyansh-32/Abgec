"use client";

import { useEffect, useState } from "react";

import PaginationControls from "./PaginationControls";
import UserCardHeader from "./UserCardHeader";
import type { MentorSummary } from "./types";

export default function PaginatedMentors() {
  const [data, setData] = useState<MentorSummary[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 6;

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/mentors?page=${page}&limit=${limit}`);
        const json = await res.json();
        setData(json.data || []);
        setTotal(json.total || 0);
      } catch (error) {
        console.error("Failed to load mentors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">
          Loading mentors...
        </div>
      ) : data.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">
          No mentors shared yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {data.map((mentor) => (
            <div
              key={mentor.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <UserCardHeader user={mentor.user} />
              <div className="mt-4 grid gap-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Domain:</span> {mentor.domain}
                </p>
                <p>
                  <span className="font-semibold">Paid:</span>{" "}
                  {mentor.isPaid ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {mentor.user.location || "—"}
                </p>
              </div>
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
