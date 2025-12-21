// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import Footer from "@/app/components/Footer";
import { signOut } from "next-auth/react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// --- Types ---
interface UserProfile {
  id: number;
  fullName: string;
  gradYear: number;
  branch: string;
  email: string;
  mobile: number;
  organisation: string | null;
  designation: string | null;
  location?: string | null;
  role: string;
  verified: boolean;
  isEmailVerified: boolean;
  profilePicture?: string | null;
  proofPicture?: string | null;
}

// --- Main Page Component ---
export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchProfile();
    else if (status !== "loading") setLoading(false);
  }, [session, status]);

  // Handlers
  const handleProfileUpdate = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  const handleRedirectToVerify = () => {
    if (!user?.id)
      return toast.error("User ID missing. Refresh and try again.");
    router.push(`/verify?userId=${user.id}`);
  };

  // --- Loading / Auth States ---
  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-600 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
        <p className="text-gray-700 mb-4">
          Please log in to view your profile.
        </p>
        <Link href="/login">
          <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-600">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        
        {/* Left Side: Logo and Title */}
        <div className="flex items-center gap-3">
          <Link href={"/"} className="cursor-pointer">
            <Image
              src="/CollegeLogo.png"
              alt="Logo"
              width={48}
              height={48}
              className="rounded-md"
            />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">
              Alumni Profile
            </h1>
            <p className="text-xs text-gray-500">
              Government Engineering College Bilaspur
            </p>
          </div>
        </div>

        {/* Right Side: Logout Button */}
        <div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })} // Redirects to home after logout
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Log Out
          </button>
        </div>

      </div>
    </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto p-4 sm:p-8">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Top Banner / Header Area */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 sm:p-10 text-white flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">{user.fullName}</h2>
              <p className="opacity-90 mt-1">
                {user.branch?.toUpperCase()} • Class of {user.gradYear}
              </p>
            </div>
            {/* The Edit Component is isolated here */}
            <EditProfileDialog user={user} onUpdate={handleProfileUpdate} />
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* Email Verification Warning */}
            {!user.isEmailVerified && (
              <div className="w-full bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
                <div className="text-yellow-900 space-y-1">
                  <h3 className="font-bold text-base flex items-center gap-2">
                    <span className="text-xl">⚠️</span> Email not verified
                  </h3>
                  <p className="text-sm text-yellow-800/90 max-w-xl">
                    Your profile is hidden from the Alumni Directory. Please
                    verify your email to become visible and access full
                    features.
                  </p>
                </div>

                <Button
                  onClick={handleRedirectToVerify}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white border-none whitespace-nowrap md:w-auto w-full"
                >
                  Verify Email
                </Button>
              </div>
            )}

            {/* Profile Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: Avatar & Contact */}
              <div className="md:col-span-1 flex flex-col items-center text-center space-y-4">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                  {user.profilePicture ? (
                    <Image
                      src={user.profilePicture}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-4xl font-bold">
                      {user.fullName.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="w-full text-left space-y-3 mt-4">
                  <DetailItem label="Email" value={user.email} />
                  <DetailItem label="Mobile" value={String(user.mobile)} />
                  <DetailItem label="Location" value={user.location} />
                </div>
              </div>

              {/* Right Column: Professional Details */}
              <div className="md:col-span-2 space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Professional Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <DetailItem label="Organisation" value={user.organisation} />
                  <DetailItem label="Designation" value={user.designation} />
                </div>

                {user.proofPicture && (
                  <div className="pt-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                      Documents
                    </h3>
                    <Link href={user.proofPicture} target="_blank">
                      <Button variant="outline" className="gap-2">
                        View Proof Document
                        <span className="text-xs">↗</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// --- Helper for displaying details ---
const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
      {label}
    </label>
    <p className="text-gray-900 font-medium break-words">{value || "—"}</p>
  </div>
);

// --- Refactored Dialog Component ---
// This isolates the form logic and styling issues from the main page
// --- Refactored Dialog Component ---
function EditProfileDialog({
  user,
  onUpdate,
}: {
  user: UserProfile;
  onUpdate: (u: UserProfile) => void;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    organisation: user.organisation || "",
    designation: user.designation || "",
    location: (user.location as string) || "",
    profilePicture: user.profilePicture || (null as string | null),
  });

  useEffect(() => {
    if (open) {
      setFormData({
        organisation: user.organisation || "",
        designation: user.designation || "",
        location: (user.location as string) || "",
        profilePicture: user.profilePicture || null,
      });
    }
  }, [open, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put("/api/profile", {
        organisation: formData.organisation || null,
        designation: formData.designation || null,
        location: formData.location || null,
        profilePicture: formData.profilePicture || null,
      });
      onUpdate(res.data);
      setOpen(false);
      toast.success("Profile updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-blue-700 hover:bg-blue-50 border border-transparent font-semibold shadow-sm">
          Edit Profile
        </Button>
      </DialogTrigger>

      {/* THE FIX: 
         1. 'fixed top-1/2 left-1/2' puts the top-left corner in the center.
         2. '-translate-x-1/2 -translate-y-1/2' pulls it back to be truly centered.
         3. 'z-50' ensures it is on top of everything.
         4. 'bg-white' ensures it's not transparent.
      */}
      <DialogContent
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-lg bg-white p-6 shadow-xl sm:rounded-lg border border-gray-200"
        // This style block forces the transform if Tailwind classes are being stripped by the component library
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Image Uploader Section */}
          <div className="flex flex-col items-center sm:flex-row gap-5 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="relative w-20 h-20 flex-shrink-0">
              {formData.profilePicture ? (
                <>
                  <Image
                    src={formData.profilePicture}
                    alt="Preview"
                    fill
                    className="rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, profilePicture: null }))
                    }
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    ×
                  </button>
                </>
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <span className="text-xs">No Img</span>
                </div>
              )}
            </div>

            <div className="flex-1 w-full text-center sm:text-left">
              <Label className="mb-2 block font-medium">Profile Photo</Label>
              <div className="flex justify-center sm:justify-start">
                <UploadButton
                  endpoint="documentUploader"
                  appearance={{
                    button:
                      "bg-blue-600 text-white text-sm px-4 py-2 rounded-md",
                    allowedContent: "hidden",
                  }}
                  onClientUploadComplete={(res) => {
                    if (res?.[0]?.url) {
                      setFormData((prev) => ({
                        ...prev,
                        profilePicture: res[0].url,
                      }));
                      toast.success("Image uploaded!");
                    }
                    setUploading(false);
                  }}
                  onUploadError={(error) => {
                    toast.error(`Upload failed: ${error.message}`);
                    setUploading(false);
                  }}
                  onUploadBegin={() => setUploading(true)}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Recommended: Square JPG/PNG
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="org">Organisation</Label>
              <Input
                id="org"
                value={formData.organisation}
                onChange={(e) =>
                  setFormData({ ...formData, organisation: e.target.value })
                }
                placeholder="Where do you work?"
                className="focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="desig">Designation</Label>
              <Input
                id="desig"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                placeholder="What is your role?"
                className="focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="loc">Location</Label>
              <Input
                id="loc"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="City, Country"
                className="focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={saving || uploading}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
