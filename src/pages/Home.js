// src/pages/Home.js
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-4xl font-bold mb-4">📚 BookShelf</h1>
      <p className="text-lg mb-6">
        Benvenuto su BookShelf! Tieni traccia dei libri che hai letto,
        stai leggendo o vorresti leggere. Accedi o registrati per iniziare.
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Registrati
        </a>
      </div>
    </div>
  );
}
