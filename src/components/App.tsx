import "../styles/App.css";
import REPL from "./REPL";

/**
 * This is the highest level component!
 */
function App() {
  return (
    <div className="App">
      <h1>Mock</h1>
      <REPL />
    </div>
  );
}

export default App;
