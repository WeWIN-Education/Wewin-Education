"use client";

import { useSession } from "next-auth/react";
import Navbar from "./layouts/header";
import Sidebar from "./layouts/sidebar";
import Footer from "./layouts/footer";
import { allowedEmails } from "../constants/email";
import { useEffect, useState } from "react";
import ClientAuthSync from "./ClientAuthSync";

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <>
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </>
    );
  }

  const isAdmin = allowedEmails.includes((session?.user?.email || "").toLowerCase());

  return (
    <>
      <ClientAuthSync />
      <Navbar />

      <div className="flex flex-1 w-full overflow-hidden">
        {isAdmin && (
          <aside className="hidden md:flex text-white shadow-lg flex-col justify-between">
            <Sidebar />
          </aside>
        )}

        <main className="flex-1">{children}</main>
      </div>

      <Footer />
    </>
  );
}
