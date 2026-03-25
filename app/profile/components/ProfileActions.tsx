"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UploadButton } from "@/utils/uploadthing";
import { X, File } from "lucide-react";

import {
  achievementFormSchema,
  mentorFormSchema,
  opportunityFormSchema,
  type AchievementFormValues,
  type MentorFormValues,
  type OpportunityFormInput,
  type OpportunityFormValues,
} from "@/lib/profile-actions-schema";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const jobTypes = [
  { label: "Full-time", value: "FullTime" },
  { label: "Part-time", value: "PartTime" },
  { label: "Internship", value: "Internship" },
  { label: "Temporary", value: "Temporary" },
];

function ActionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function ProfileActions() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <ActionCard
        title="Become a Mentor"
        description="Share your expertise with juniors and alumni." 
      >
        <MentorDialog />
      </ActionCard>
      <ActionCard
        title="Share an Opportunity"
        description="Post openings from your team or network." 
      >
        <OpportunityDialog />
      </ActionCard>
      <ActionCard
        title="Share an Achievement"
        description="Celebrate milestones with the community." 
      >
        <AchievementDialog />
      </ActionCard>
    </section>
  );
}

function MentorDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<MentorFormValues, unknown, MentorFormValues>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      isPaid: false,
      domain: "",
    },
  });

  const onSubmit = async (values: MentorFormValues) => {
    try {
      await axios.post("/api/mentor", values);
      toast.success("Mentor profile saved.");
      setOpen(false);
      form.reset({ isPaid: values.isPaid, domain: "" });
    } catch {
      toast.error("Could not save mentor profile.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-700 text-white hover:bg-blue-800">
          Become a Mentor
        </Button>
      </DialogTrigger>
      <DialogContent
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <DialogHeader>
          <DialogTitle>Become a mentor</DialogTitle>
          <DialogDescription>
            Let the community know how you can help.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mentoring domain</FormLabel>
                  <FormControl>
                    <Input placeholder="Frontend, Data, Career" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPaid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is the mentorship paid?</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? "true" : "false"}
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="false">No</SelectItem>
                        <SelectItem value="true">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function AchievementDialog() {
  const [open, setOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    name: string;
    isImage: boolean;
  } | null>(null);
  const form = useForm<AchievementFormValues, unknown, AchievementFormValues>({
    resolver: zodResolver(achievementFormSchema),
    defaultValues: {
      achievement: "",
      attachmentUrl: "",
    },
  });

  const onSubmit = async (values: AchievementFormValues) => {
    try {
      const submitData = {
        ...values,
        attachmentUrl: uploadedFile?.url || values.attachmentUrl,
      };
      await axios.post("/api/achievement", submitData);
      toast.success("Achievement shared.");
      setOpen(false);
      setUploadedFile(null);
      form.reset({ achievement: "", attachmentUrl: "" });
    } catch {
      toast.error("Could not share achievement.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Share Achievement
        </Button>
      </DialogTrigger>
      <DialogContent
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <DialogHeader>
          <DialogTitle>Share an achievement</DialogTitle>
          <DialogDescription>
            Highlight a milestone for the alumni community.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="achievement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achievement</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Promotion, award, certification..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Attachment (Image or PDF)</FormLabel>
              {!uploadedFile ? (
                <div className="rounded-lg border border-dashed border-gray-300 p-4">
                  <UploadButton
                    endpoint="documentUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        const file = res[0];
                        const isImage = file.type?.startsWith("image/") || false;
                        const fileName =
                          file.name ||
                          file.url.split("/").pop()?.split("?")[0] ||
                          "Attachment";
                        
                        console.log("Uploaded file:", file);
                        setUploadedFile({
                          url: file.url,
                          name: fileName,
                          isImage,
                        });
                        toast.success("File uploaded successfully");
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                  />
                </div>
              ) : (
                <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                  {uploadedFile.isImage ? (
                    <div className="space-y-2">
                      <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-200">
                        <Image
                          src={uploadedFile.url}
                          alt="Preview"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                      <p className="text-xs text-gray-600">{uploadedFile.name}</p>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                      >
                        <X size={16} />
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <File className="text-red-500" size={32} />
                        <div>
                          <p className="text-sm font-semibold">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-gray-600">PDF Document</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                      >
                        <X size={16} />
                        Remove file
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Sharing..." : "Share"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function OpportunityDialog() {
  const [open, setOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    name: string;
    isImage: boolean;
  } | null>(null);
  const form = useForm<
    OpportunityFormInput,
    unknown,
    OpportunityFormValues
  >({
    resolver: zodResolver(opportunityFormSchema),
    defaultValues: {
      jobTitle: "",
      location: "",
      remotePosition: false,
      jobType: "FullTime",
      description: "",
      applicationUrl: "",
      companyName: "",
      website: "",
      attachmentUrl: "",
    },
  });

  const onSubmit = async (values: OpportunityFormValues) => {
    try {
      const submitData = {
        ...values,
        attachmentUrl: uploadedFile?.url || values.attachmentUrl,
      };
      await axios.post("/api/opportunity", submitData);
      toast.success("Opportunity shared.");
      setOpen(false);
      setUploadedFile(null);
      form.reset({
        jobTitle: "",
        location: "",
        remotePosition: false,
        jobType: "FullTime",
        description: "",
        applicationUrl: "",
        companyName: "",
        website: "",
        attachmentUrl: "",
      });
    } catch {
      toast.error("Could not share opportunity.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
          Share Opportunity
        </Button>
      </DialogTrigger>
      <DialogContent
        className="fixed top-1/2 left-1/2 max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto sm:max-w-2xl"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <DialogHeader>
          <DialogTitle>Share an opportunity</DialogTitle>
          <DialogDescription>
            Add details so alumni can apply quickly.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 sm:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remotePosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is this a remote role?</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? "true" : "false"}
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="false">No</SelectItem>
                        <SelectItem value="true">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job type</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="sm:col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Role responsibilities, skills, team info"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="applicationUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application link (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company website (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="sm:col-span-2 space-y-2">
              <FormLabel>Attachment (Image or PDF)</FormLabel>
              {!uploadedFile ? (
                <div className="rounded-lg border border-dashed border-gray-300 p-4">
                  <UploadButton
                    endpoint="documentUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        const file = res[0];
                        const isImage = file.type?.startsWith("image/") || false;
                        const fileName =
                          file.name ||
                          file.url.split("/").pop()?.split("?")[0] ||
                          "Attachment";
                        
                        console.log("Uploaded file:", file);
                        setUploadedFile({
                          url: file.url,
                          name: fileName,
                          isImage,
                        });
                        toast.success("File uploaded successfully");
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                  />
                </div>
              ) : (
                <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                  {uploadedFile.isImage ? (
                    <div className="space-y-2">
                      <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-200">
                        <Image
                          src={uploadedFile.url}
                          alt="Preview"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                      <p className="text-xs text-gray-600">{uploadedFile.name}</p>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                      >
                        <X size={16} />
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <File className="text-red-500" size={32} />
                        <div>
                          <p className="text-sm font-semibold">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-gray-600">PDF Document</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                      >
                        <X size={16} />
                        Remove file
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Sharing..." : "Share"}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
