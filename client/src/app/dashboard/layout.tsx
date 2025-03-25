import Link from "next/link";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/dh.jpg" alt="Background" fill priority />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="p-4">
          <nav className="max-w-7xl mx-auto backdrop-blur-md bg-white/10 rounded-full border border-white/20 shadow-lg">
            <div className="px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link href="/" className="flex-shrink-0">
                    <span className="text-2xl font-bold text-white">
                      Music App
                    </span>
                  </Link>
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      href="/dashboard"
                      className="px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/20 transition-all"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/favorites"
                      className="px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/20 transition-all"
                    >
                      Favorites
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="px-6 py-2 rounded-full text-sm font-medium text-white border border-white/20 hover:bg-white/20 transition-all"
                  >
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
}
