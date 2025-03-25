export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-20 px-6 sm:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Music App</h1>
          <p className="text-xl text-gray-300 mb-12">
            Discover, search, and favorite your music all in one place
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
