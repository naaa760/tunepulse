import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-2xl font-bold text-indigo-600">
                  Music App
                </span>
              </Link>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/favorites"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
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
  );
}
