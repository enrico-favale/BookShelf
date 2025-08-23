import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Inserisci uno username.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email non valida.";
    if (formData.password.length < 6) newErrors.password = "La password deve avere almeno 6 caratteri.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Le password non coincidono.";
    if (!formData.termsAccepted) newErrors.termsAccepted = "Devi accettare i termini e le condizioni.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        email: formData.email,
        createdAt: new Date()
      });

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      setErrors({ firebase: "Registrazione fallita. Riprova." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <BookOpen className="h-8 w-8" />
            <span className="text-2xl font-bold">BookShelf</span>
          </Link>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-elegant bg-gradient-card">
          <div className="flex flex-col space-y-1.5 p-6 text-center">
            <h3 className="text-2xl text-primary font-semibold">Crea il tuo account</h3>
            <p className="text-sm text-muted-foreground">Comincia a costruire la tua libreria digitale</p>
          </div>

          <form className="p-6 py-0 space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label forId="username">Username</Label>
              <Input id="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <Label forId="email">Email</Label>
              <Input id="email" type="email" placeholder="la.tua@email.com" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label forId="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <Label forId="confirmPassword">Conferma Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <input type="checkbox" id="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mt-1 rounded border-border text-primary focus:ring-primary" />
              <Label htmlFor="termsAccepted" className="text-sm font-normal leading-relaxed">
                Accetto i{" "}
                <Link to="#" className="text-primary hover:underline">termini di servizio</Link> e la{" "}
                <Link to="#" className="text-primary hover:underline">privacy policy</Link>
              </Label>
            </div>
            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

            {errors.firebase && <p className="text-red-500 text-center">{errors.firebase}</p>}

            <Button type="submit" className="w-full shadow-card mt-2" disabled={loading}>
              {loading ? "Registrazione in corso..." : "Accedi alla Libreria"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground py-4">
            Hai già un account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Accedi qui</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
