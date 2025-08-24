import { useState } from "react";
import { BookOpen, Search, Plus, Scan, Star } from "lucide-react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import Button from "../components/Button";
import Label from "../components/Label";
import Input from "../components/Input";
import SelectStatus from "../components/SelectStatus";
import Textarea from "../components/Textarea";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddBook() {
  const [isbn, setIsbn] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookData, setBookData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("wishlist");
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");

  // Funzione per cercare il libro da un'API (es. Google Books)
  const handleIsbnSearch = async () => {
    if (!isbn.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );
      const data = await res.json();

      if (data.totalItems > 0) {
        const book = data.items[0].volumeInfo;
        setBookData({
          title: book.title,
          authors: book.authors?.join(", ") || "Autore sconosciuto",
          thumbnail: book.imageLinks?.thumbnail || "no_cover_thumb.gif",
          publishedDate: book.publishedDate || "Data not found",
          pageCount: book.pageCount || "Data not found",
          language: book.language || "Data not found",
          publisher: book.publisher || "Data not found",
        });
      } else {
        setBookData(null);
        alert("Nessun libro trovato per questo ISBN");
      }
    } catch (err) {
      console.error(err);
      alert("Errore durante la ricerca del libro");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBook = async () => {
    if (!bookData) {
      alert("Nessun libro selezionato");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Devi essere loggato per aggiungere un libro");
      return;
    }

    const bookToSave = {
      isbn,
      title: bookData.title,
      authors: bookData.authors,
      publisher: bookData.publisher,
      publishedDate: bookData.publishedDate,
      pageCount: bookData.pageCount,
      language: bookData.language,
      status: selectedStatus,
      rating: selectedStatus === "finished" ? rating : null,
      notes: notes.trim() || null,
      createdAt: new Date(),
    };

    if (bookData.thumbnail && bookData.thumbnail !== "no_cover_thumb.gif") {
      bookToSave.thumbnail = bookData.thumbnail;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "books"), bookToSave);
      alert("Libro aggiunto con successo!");
      setBookData(null);
      setIsbn("");
      setSelectedStatus("wishlist");
      setRating(0);
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("Errore durante il salvataggio del libro");
    }
  };

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

      <main className="container mx-auto px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Aggiungi un Nuovo Libro
            </h1>
            <p className="text-muted-foreground">
              Inserisci l'ISBN del libro per trovare automaticamente le
              informazioni
            </p>
          </div>

          {/* ISBN Search */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-card shadow-card mb-8">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="flex text-2xl font-semibold leading-none tracking-tight gap-2">
                <Search className="h-5 w-5" />
                Cerca per ISBN
              </h3>
              <p>
                Inserisci il codice ISBN del libro o scansiona il codice a barre
              </p>
            </div>

            <div className="flex flex-col md:flex-row p-6 pt-0 gap-2">
              <div className="flex-1">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  placeholder="Es. 9788845292613"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </div>

              <div className="flex items-end justify-between md:gap-2">
                <Button
                  onClick={handleIsbnSearch}
                  disabled={isLoading || !isbn.trim()}
                >
                  {isLoading ? (
                    <>Cercando...</>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Cerca
                    </>
                  )}
                </Button>
                <Button>
                  <Scan className="h-4 w-4 mr-2" />
                  Scansiona
                </Button>
              </div>
            </div>
          </div>

          {/* Risultato libro trovato */}
          {bookData && (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Book Info */}
              <div className="md:col-span-2 rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-card shadow-card md:mb-8 p-4">
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-primary mb-2">
                    Libro trovato
                  </h1>
                  <p className="text-muted-foreground">
                    Dettagli per ISBN: {isbn}
                  </p>
                </div>

                <div className="text-center md:text-left">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <img
                        src={bookData.thumbnail}
                        alt={`Copertina di ${bookData.title}`}
                        className="w-full max-w-48 mx-auto rounded-lg shadow-book"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-1">
                          {bookData.title}
                        </h3>
                        <p className="text-lg text-muted-foreground">
                          di {bookData.authors}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Editore:</span>
                          <p className="text-muted-foreground">
                            {bookData.publisher}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Anno:</span>
                          <p className="text-muted-foreground">
                            {bookData.publishedDate}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Pagine:</span>
                          <p className="text-muted-foreground">
                            {bookData.pageCount}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Lingua:</span>
                          <p className="text-muted-foreground">
                            {bookData.language.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to Library */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-card shadow-card mb-8 p-4">
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-primary mb-2">
                    Aggiungi
                  </h1>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="status">Stato di Lettura</Label>
                    <SelectStatus
                      value={selectedStatus}
                      onValueChange={(value) => {
                        setSelectedStatus(value);
                        console.log("Nuovo status:", value);
                      }}
                    />
                  </div>

                  {selectedStatus === "finished" && (
                    <div>
                      <Label>Valutazione</Label>
                      <div className="flex items-center gap-2 mt-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 cursor-pointer transition-colors ${
                              i < rating
                                ? "text-accent fill-accent"
                                : "text-muted-foreground hover:text-accent"
                            }`}
                            onClick={() => setRating(i + 1)}
                          />
                        ))}
                        {rating > 0 && (
                          <Button className="py-1" onClick={() => setRating(0)}>
                            Reset
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="notes">Note Personali</Label>
                    <Textarea
                      id="notes"
                      placeholder="Aggiungi le tue note, riflessioni o citazioni preferite..."
                      value={notes}
                      onChange={setNotes}
                      className="mt-1 min-h-[100px]"
                    />
                  </div>

                  <Button
                    onClick={handleSaveBook}
                    className="w-full"
                    variant="hero"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Aggiungi alla Libreria
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
