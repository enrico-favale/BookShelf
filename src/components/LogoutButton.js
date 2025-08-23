import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      logout();
      alert("Logout effettuato con successo!");
      window.location.href = "/"; // Reindirizza alla home (opzionale)
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 shadow-card transition"
    >
      Logout
    </button>
  );
}
