import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      logout();
      window.location.href = "/"; // Reindirizza alla home (opzionale)
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`inline-flex items-center justify-center hover:bg-primary/90 dark:hover:bg-primary/90 hover:text-white hover:scale-105 border border-ring rounded-md p-2 text-md px-4 bg-card text-card-foreground hover:shadow-card transition-all duration-200`}
    >
      Logout
    </button>
  );
}
