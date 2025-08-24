import { BookOpen, RotateCcw, Star } from "lucide-react";
import Button from "../components/Button";
import DarkModeToggle from "../components/DarkModeToggle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import SelectStatus from "../components/SelectStatus";
import { useAuth } from "../context/AuthContext";
import Textarea from "../components/Textarea";
import DestructiveButton from "../components/DestructiveButton";

export default function BookDetails() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(0);
  const [editedStatus, setEditedStatus] = useState("");
  const [editedNotes, setEditedNotes] = useState("");

  useEffect(() => {
    if (!currentUser || !id) return;

    const fetchBook = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid, "books", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBook({ id: docSnap.id, ...data });
          setEditedRating(data.rating || 0);
          setEditedStatus(data.status || "");
          setEditedNotes(data.notes || "");
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error(err);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, currentUser, navigate]);

  const handleResetRating = () => {
    if (isEditing) {
      setEditedRating(0);
    }
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "users", currentUser.uid, "books", id);
      await updateDoc(docRef, {
        status: editedStatus,
        rating: editedRating,
        notes: editedNotes,
      });
      setBook((prev) => ({
        ...prev,
        status: editedStatus,
        rating: editedRating,
        notes: editedNotes,
      }));
      setIsEditing(false);
    } catch (err) {
      console.error("Errore salvataggio:", err);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Sei sicuro di voler eliminare questo libro? Questa azione non può essere annullata."
    );
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "users", currentUser.uid, "books", id));
      navigate("/dashboard");
    } catch (err) {
      console.error("Errore eliminazione:", err);
    }
  };

  if (loading) return <p>Caricamento...</p>;
  if (!book) return <p>Nessun libro trovato</p>;

  const currentRating = isEditing ? editedRating : book.rating;

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
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            <DarkModeToggle />
          </div>
        </nav>
      </header>

      <main>
        <div className="container mx-auto px-6 pb-12 grid lg:grid-cols-3 gap-8">
          {/* Book Cover and Basic Info */}
          <div className=" md:col-span-1 rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-card shadow-card md:mb-8 p-4">
            <div className="p-6 pb-4">
              <div className="text-center space-y-4">
                <img
                  src={book.thumbnail ? book.thumbnail : "/no_cover_thumb.gif"}
                  alt={`Copertina di ${book.title}`}
                  className="w-full max-w-64 mx-auto rounded-lg shadow-book"
                />
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-primary">
                    {book.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    di {book.authors}
                  </p>
                  <p className="text-lg text-muted-foreground">
                    {book.categories != "Data not found" ? book.categories : ""}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <span className="font-medium block">ISBN</span>
                    <p className="text-muted-foreground">{book.isbn}</p>
                  </div>
                  <div className="text-center">
                    <span className="font-medium block">Pagine</span>
                    <p className="text-muted-foreground">{book.pageCount}</p>
                  </div>
                  <div className="text-center">
                    <span className="font-medium block">Editore</span>
                    <p className="text-muted-foreground">{book.publisher}</p>
                  </div>
                  <div className="text-center">
                    <span className="font-medium block">Anno</span>
                    <p className="text-muted-foreground">
                      {book.publishedDate}
                    </p>
                  </div>
                </div>
                <div className="w-full inline-flex items-center justify-center bg-primary/90 text-white border border-ring rounded-md p-1 text-md font-bold">
                  {book.status.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Colonna destra */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-card shadow-card p-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-primary">
                  Stato di lettura
                </h1>
                <p className="text-lg text-muted-foreground">
                  Visualizza e modifica lo stato e la valutazione.
                </p>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <span className="font-medium block mb-2">Stato</span>
                      {isEditing ? (
                        <SelectStatus
                          name="status"
                          value={editedStatus}
                          onValueChange={setEditedStatus}
                        />
                      ) : (
                        <p className="w-full inline-flex items-center justify-center bg-primary/90 text-white border border-ring rounded-md p-1 text-md font-bold">
                          {book.status.toUpperCase() || "Nessuno stato"}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Valutazione</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 transition-colors ${
                              isEditing ? "cursor-pointer" : ""
                            } ${
                              i < currentRating
                                ? "text-accent fill-accent"
                                : "text-muted-foreground hover:text-accent"
                            }`}
                            onClick={
                              isEditing
                                ? () => setEditedRating(i + 1)
                                : undefined
                            }
                          />
                        ))}
                        {currentRating > 0 && (
                          <span className="text-sm text-muted-foreground ml-2">
                            ({currentRating}/5)
                          </span>
                        )}
                        {currentRating > 0 && (
                          <Button
                            size="sm"
                            onClick={handleResetRating}
                            className="text-xs text-muted-foreground"
                          >
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Reset
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-card shadow-card p-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-primary">
                  Note personali
                </h2>
                <p className="text-lg text-muted-foreground">
                  Riflessioni personali, pensieri e impressioni sul libro.
                </p>
                {isEditing ? (
                  <Textarea
                    name="notes"
                    value={editedNotes}
                    onChange={setEditedNotes}
                    className="w-full border p-2 rounded-md"
                    rows={5}
                  />
                ) : (
                  <p>{book.notes || "Nessuna nota"}</p>
                )}
              </div>
            </div>

            {/* Pulsanti */}
            <div className="flex w-full justify-between gap-4">
              <div className="flex gap-4">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave}>Salva</Button>
                    <Button onClick={() => setIsEditing(false)}>Annulla</Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Modifica</Button>
                )}
              </div>
              <DestructiveButton onClick={handleDelete}>
                Elimina
              </DestructiveButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
