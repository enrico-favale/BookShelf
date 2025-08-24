import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Assicurati che logout sia async
      navigate("/"); // Reindirizza alla home senza ricaricare la pagina
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center justify-center hover:bg-primary/90 dark:hover:bg-primary/90 hover:text-white hover:scale-105 border border-ring rounded-md p-2 text-md px-4 bg-card text-card-foreground hover:shadow-card transition-all duration-200"
    >
      Logout
    </button>
  );
}
