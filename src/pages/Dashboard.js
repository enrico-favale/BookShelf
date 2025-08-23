import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import LogoutButton from "../components/LogoutButton";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
            console.log(userDoc.data());
          setUsername(userDoc.data().username);
        }
      } catch (error) {
        console.error("Errore nel recupero dati utente:", error);
      }
    };

    fetchUserData();
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <div>
      <h1>Benvenuto {username || currentUser.email}</h1>
      <LogoutButton />
    </div>
  );
}
