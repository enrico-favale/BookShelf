import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, doc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { BookOpen, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import Button from "../components/Button";
import Input from "../components/Input";
import LogoutButton from "../components/LogoutButton";
import StatsCard from "../components/StatsCard";
import BookCard from "../components/BookCard";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
  if (!currentUser) {
    navigate("/login");
    return;
  }

  const fetchUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        setUsername(userDoc.data().username);
      }
    } catch (error) {
      console.error("Errore nel recupero dati utente:", error);
    }
  };

  fetchUserData();

  const fetchBooks = async () => {
    try {
      const booksRef = collection(db, "users", currentUser.uid, "books");
      const q = query(booksRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const booksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksList);
    } catch (error) {
      console.error("Errore nel recupero libri:", error);
    }
  };

  fetchBooks();
}, [currentUser, navigate]);


  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="md:flex justify-center md:justify-between items-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4 md:mb-0">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">BookShelf</span>
          </div>
          <div className="flex justify-center gap-4">
            <LogoutButton />
            <DarkModeToggle />
          </div>
        </nav>
        <h1 className="text-center text-4xl lg:text-5xl font-bold text-primary leading-tight">
          Benvenuto nella tua libreria, <span className="text-accent">{username}</span>!
        </h1>
      </header>

      <main className="container mx-auto px-6 pb-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatsCard number="1" description="Totali"/>
          <StatsCard number="1" description="Totali"/>
          <StatsCard number="1" description="Totali"/>
          <StatsCard number="1" description="Totali"/>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cerca nella tua libreria..." 
              className="pl-10 mt-0 h-12 bg-background border-border"
            />
          </div>
          <Link to="/add-book">
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Aggiungi Libro
            </Button>
          </Link>
        </div>

        { /* Books Grid */ }
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              rating={book.rating}
              state={book.status}
              {...(book.thumbnail ? { thumbnail: book.thumbnail } : {})}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
