import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/authOptions";

export default async function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const roles = session.user?.roles ?? [];

  const isAdmin = roles.includes("ADMIN");
  const isTeacher = roles.includes("TEACHER");
  if (!isAdmin && !isTeacher) redirect("/");

  return <>{children}</>;
}

