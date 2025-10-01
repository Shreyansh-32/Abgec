import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      role : "alumni" | "admin";
      name?: string | null;
      image?: string | null;
    }&DefaultSession['alumni'];
  }

  interface User {
    id: number;
    email: string;
    role : "alumni" | "admin";
  }
}
