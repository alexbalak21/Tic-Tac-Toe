export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 space-y-6">

        <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400">
          Tailwind CSS Test Page
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-center">
          If you see colors, spacing, shadows, hover effects, and dark mode working,
          Tailwind is correctly configured.
        </p>

        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
          Test Button
        </button>

        <div className="grid grid-cols-3 gap-4">
          <div className="h-20 bg-red-400 rounded-lg"></div>
          <div className="h-20 bg-green-400 rounded-lg"></div>
          <div className="h-20 bg-yellow-400 rounded-lg"></div>
        </div>

        <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300">
            This is a bordered box. If the border and colors appear, Tailwind works.
          </p>
        </div>

        <div className="animate-pulse bg-purple-400 h-10 rounded-lg"></div>

      </div>
    </div>
  );
}
