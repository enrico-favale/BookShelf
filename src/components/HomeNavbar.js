// src/components/Navbar.js
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between h-16 px-6 bg-brand-light dark:bg-brand-dark shadow-md">
      <Link
        to="/"
        className="text-2xl font-serif font-bold text-brand-primary dark:text-brand-secondary"
      >
        BookShelf
      </Link>
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-gray-700 dark:text-gray-200 hover:underline"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-gray-700 dark:text-gray-200 hover:underline"
        >
          Register
        </Link>
        <DarkModeToggle />
      </div>
    </nav>
  );
}
