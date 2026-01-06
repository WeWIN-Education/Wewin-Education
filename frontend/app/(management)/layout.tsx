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
  if (!isAdmin) redirect("/"); 

  return <>{children}</>;
}
