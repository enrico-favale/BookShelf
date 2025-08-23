import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Errore di login:", error.message);
    }
  };

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

        {/* Card di Login */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-elegant bg-gradient-card">
          <div className="flex flex-col space-y-1.5 p-6 text-center">
            <h3 className="text-2xl text-primary font-semibold leading-none tracking-tight">Bentornato</h3>
            <p className="text-sm text-muted-foreground">Accedi alla tua libreria</p>
          </div>

          {/* Form di Login */}
          <form className="p-6 py-0 space-y-4" onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="la.tua@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border focus:ring-primary"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-border focus:ring-primary"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Ricordami
                </Label>
              </div>
              <Link to="#" className="text-primary hover:underline">
                Password dimenticata?
              </Link>
            </div>

            <Button type="submit" className="w-full shadow-card mt-2">
              Accedi alla Libreria
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground py-4">
            Non hai ancora un account?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Registrati qui
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
