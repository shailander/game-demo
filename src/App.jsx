import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import TriviaShowdown from "./game/trivia-showdown";
import MillionaireTrivia from "./game/millionaire-trivia";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Trivia_Showdown" element={<TriviaShowdown />} />
        <Route path="/Millionaire_Trivia" element={<MillionaireTrivia />} />
        <Route path="*" element={<Navigate to="/Trivia_Showdown" replace />} />
      </Routes>
    </div>
  );
}

export default App;
