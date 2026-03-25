"use client";

import Image from "next/image";

import type { UserSummary } from "./types";

export default function UserCardHeader({ user }: { user: UserSummary }) {
  return (
    <div className="flex items-center gap-3">
      {user.profilePicture ? (
        <Image
          src={user.profilePicture}
          alt={user.fullName}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700">
          {user.fullName?.[0] ?? "?"}
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
        <p className="text-xs text-gray-600">
          {user.designation || "Alumni"}
          {user.organisation ? ` • ${user.organisation}` : ""}
        </p>
        <p className="text-xs text-gray-500">
          {user.branch} {user.gradYear ? `• ${user.gradYear}` : ""}
        </p>
      </div>
    </div>
  );
}
