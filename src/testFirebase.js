// src/testFirebase.js
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function testFirebase() {
  try {
    // Scriviamo un documento di prova
    const docRef = await addDoc(collection(db, "test"), {
      name: "Firebase test",
      createdAt: new Date(),
    });
    console.log("Documento scritto con ID:", docRef.id);

    // Leggiamo i documenti nella collezione "test"
    const querySnapshot = await getDocs(collection(db, "test"));
    querySnapshot.forEach((doc) => {
      console.log("Documento trovato:", doc.id, doc.data());
    });

    return true;
  } catch (error) {
    console.error("Errore connessione Firebase:", error);
    return false;
  }
}
