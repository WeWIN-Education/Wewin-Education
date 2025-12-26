// Layout cho user - KHÔNG yêu cầu đăng nhập
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  console.log(session);

  const isAdmin = allowedEmails.includes(session.user?.email || "");
  if (isAdmin) redirect("/");

  return <div className="min-h-screen overflow-visible">{children}</div>;
=======
  return (
    <div className="min-h-screen overflow-visible">
      {children}
    </div>
  );
>>>>>>> 372a23f4882285f56033ac5b3dc630385811a0ad
}
