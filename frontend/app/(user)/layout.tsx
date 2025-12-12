// Layout cho user - KHÔNG yêu cầu đăng nhập
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-visible">
      {children}
    </div>
  );
}
