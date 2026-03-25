export type UserSummary = {
  id: number;
  fullName: string;
  gradYear: number;
  branch: string;
  designation: string | null;
  organisation: string | null;
  location?: string | null;
  profilePicture?: string | null;
};

export type MentorSummary = {
  id: number;
  domain: string;
  isPaid: boolean;
  user: UserSummary;
};

export type AchievementSummary = {
  id: number;
  achievement: string;
  user: UserSummary;
};

export type OpportunitySummary = {
  id: number;
  jobTitle: string;
  location?: string | null;
  remotePosition: boolean;
  jobType: "FullTime" | "PartTime" | "Internship" | "Temporary";
  description: string;
  applicationUrl?: string | null;
  companyName: string;
  website?: string | null;
  user: UserSummary;
};
