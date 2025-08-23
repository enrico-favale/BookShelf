import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <BookOpen className="h-8 w-8" />
            <span className="text-2xl font-bold">BookShelf</span>
          </Link>
        </div>

        {/* Card di Register */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-elegant bg-gradient-card">
          <div className="flex flex-col space-y-1.5 p-6 text-center">
            <h3 className="text-2xl text-primary font-semibold leading-none tracking-tight">Crea il tuo account</h3>
            <p className="text-sm text-muted-foreground">Comincia a costruire la tua libreria digitale</p>
          </div>

          {/* Form di Register */}

          <form className="p-6 py-0 space-y-4">
            <div>
              <Label forID="username">Username</Label>
              <Input
                id="username" 
                type="username" 
                placeholder="Username"
                className="bg-background border-border focus:ring-primary"
              />
            </div>

            <div>
              <Label forID="email">Email</Label>
              <Input
                id="email" 
                type="email" 
                placeholder="la.tua@email.com"
                className="bg-background border-border focus:ring-primary"
              />
            </div>

            <div>
              <Label forID="password">Password</Label>
              <Input
                id="password" 
                type="password" 
                placeholder="••••••••"
                className="bg-background border-border focus:ring-primary"
              />
            </div>

            <div>
              <Label forID="confermaPassword">Conferma Password</Label>
              <Input
                id="confermaPassword" 
                type="password" 
                placeholder="••••••••"
                className="bg-background border-border focus:ring-primary"
              />
            </div>

            <div className="flex items-start space-x-2">
               <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 rounded border-border text-primary focus:ring-primary"
                />
              <Label htmlFor="terms" className="text-sm font-normal leading-relaxed">
                  Accetto i{" "}
                  <Link to="#" className="text-primary hover:underline">
                    termini di servizio
                  </Link>{" "}
                  e la{" "}
                  <Link to="#" className="text-primary hover:underline">
                    privacy policy
                  </Link>
                </Label>
            </div>

            <Link to="/dashboard">
              <Button type="button"  className="w-full shadow-card mt-2">
                Accedi alla Libreria
              </Button>
            </Link>
          </form>

          <div className="text-center text-sm text-muted-foreground py-4">
            Hai già un account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Accedi qui
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
