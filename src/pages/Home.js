import { BookOpen, Star, BookmarkPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import Button from "../components/Button";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="md:flex justify-between items-center">
          <div className="flex justify-center items-center gap-2 mb-4 md:mb-0">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">BookShelf</span>
          </div>
          <div className="flex justify-center gap-4">
            <Link to="/login">
              <Button>Accedi</Button>
            </Link>
            <Link to="/register">
              <Button>Registrati</Button>
            </Link>
            <DarkModeToggle />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4">

        <section className="md:py-8 text-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
                La tua libreria
                <span className="block text-accent">digitale</span>
                personale
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                Scansiona, organizza e tieni traccia di tutti i tuoi libri preferiti. 
                Crea la tua collezione personale con note, valutazioni e molto altro.
              </p>
            </div>
            <div className="relative animate-float">
              <img 
                src="hero-books.jpg"
                alt="Collezione di libri eleganti" 
                className="rounded-2xl shadow-book w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Tutto quello che ti serve per i tuoi libri
            </h2>
            <p className="text-xl text-muted-foreground">
              Funzionalità pensate per gli amanti della lettura
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <FeatureCard 
              icon={BookOpen} 
              title="Scansiona ISBN" 
              description="Aggiungi libri rapidamente scannerizzando il codice ISBN" 
            />

            <FeatureCard 
              icon={Star} 
              title="Valutazioni" 
              description="Valuta i tuoi libri con un sistema a stelle" 
            />

            <FeatureCard 
              icon={BookmarkPlus} 
              title="Stati di lettura" 
              description="Organizza i libri per stato: leggendo, wishlist, finito" 
            />

            <FeatureCard 
              icon={Users} 
              title="Note Personali" 
              description="Aggiungi note e riflessioni sui tuoi libri" 
            />
          </div>
        </section>

      </main>

    </div>
  );
}
