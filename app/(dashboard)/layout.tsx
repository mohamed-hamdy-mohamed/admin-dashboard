import AppShell from "@/components/AppShell";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden">
      <AppShell>{children}</AppShell>
    </div>
  );
}
