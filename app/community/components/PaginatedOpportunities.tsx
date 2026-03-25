"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import PaginationControls from "./PaginationControls";
import UserCardHeader from "./UserCardHeader";
import type { OpportunitySummary } from "./types";

export default function PaginatedOpportunities() {
  const [data, setData] = useState<OpportunitySummary[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 6;

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/opportunities?page=${page}&limit=${limit}`);
        const json = await res.json();
        setData(json.data || []);
        setTotal(json.total || 0);
      } catch (error) {
        console.error("Failed to load opportunities", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">
          Loading opportunities...
        </div>
      ) : data.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">
          No opportunities shared yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {data.map((opportunity) => (
            <div
              key={opportunity.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <UserCardHeader user={opportunity.user} />

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p className="text-base font-semibold text-gray-900">
                  {opportunity.jobTitle}
                </p>
                <p>
                  {opportunity.companyName} • {opportunity.jobType}
                </p>
                <p>
                  {opportunity.remotePosition ? "Remote" : "On-site"}
                  {opportunity.location ? ` • ${opportunity.location}` : ""}
                </p>
                <p className="text-xs text-gray-600">
                  {opportunity.description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {opportunity.applicationUrl ? (
                  <Link
                    href={opportunity.applicationUrl}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Apply link
                  </Link>
                ) : null}
                {opportunity.website ? (
                  <Link
                    href={opportunity.website}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Company website
                  </Link>
                ) : null}
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
