import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { allowedEmails } from "@/lib/constants/email";
import { authOptions } from "../api/auth/authOptions";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const isAdmin = allowedEmails.includes(session.user?.email || "");
  if (isAdmin) redirect("/");

  return (
    <div className="min-h-screen overflow-visible">
      {children}
    </div>
  );
}

