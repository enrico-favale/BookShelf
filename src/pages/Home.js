export default function Home() {
  return (
    <div className="flex flex-col items-center text-center pt-12 min-h-[calc(100vh-4rem)] bg-light dark:bg-brand-dark px-4">
      {/* Hero Section */}
      <h1 className="text-5xl font-serif font-bold text-brand-primary dark:text-brand-secondary mb-6">
        Welcome to BookShelf
      </h1>
      <p className="text-lg italic text-gray-700 dark:text-gray-300 max-w-2xl mb-12">
        Track your reading journey, one book at a time.
      </p>

      {/* Image + Features */}
      <div className="flex flex-col md:flex-row items-start max-w-6xl w-full mb-16">
        {/* App Screenshot */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-xl shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700">
            <img
              src="/path-to-screenshot.png"
              alt="BookShelf app screenshot"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Features Cards */}
        <div className="flex-1 flex flex-col gap-4">
          {[
            { title: "Add Books", desc: "Use the ISBN or your camera to add books to your bookshelf." },
            { title: "Track Progress", desc: "Monitor which books you’ve read and your current reads." },
            { title: "Rate Books", desc: "Give a score from 1 to 5 for each book." },
            { title: "Personal Notes", desc: "Add private notes to remember your thoughts." }
          ].map((feature, i) => (
            <div
              key={i}
              className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform scale-95 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
