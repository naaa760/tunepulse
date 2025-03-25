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
        <nav className="bg-black bg-opacity-80 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0">
                  <span className="text-2xl font-bold text-white">
                    Music App
                  </span>
                </Link>
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/dashboard"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-indigo-300 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/favorites"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-indigo-300 transition-colors"
                  >
                    Favorites
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <span className="inline-flex rounded-md shadow-sm">
                  <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    Home
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </div>
    </div>
  );
}
