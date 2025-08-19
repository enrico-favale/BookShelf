import { useEffect } from "react";
import { testFirebase } from "./testFirebase";

function App() {
  useEffect(() => {
    testFirebase();
  }, []);

  return (
    <div className="App">
      <h1 className="text-2xl font-bold">BookShelf</h1>
      <p>Controlla la console per il test Firebase.</p>
    </div>
  );
}

export default App;
