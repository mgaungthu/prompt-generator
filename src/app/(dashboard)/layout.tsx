import SideBar from "@/components/SideBar";
import '../globals.css'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <main className="flex flex-1">
            {/* Sidebar */}
            <SideBar />
            {/* Main content */}
            <section className="flex-1 p-6">{children}</section>
          </main>
        </div>
      </body>
    </html>
  );
}