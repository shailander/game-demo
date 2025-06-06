import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import TriviaShowdown from "./game/trivia-showdown";
import ESPNSportsMillionaire from "./game/millionaire-trivia";
import ESPNPersonalityShowdown from "./game/personality-showdown";
import SportsCenter from "./game/sports-center";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Trivia_Showdown" element={<TriviaShowdown />} />
        <Route path="/Millionaire_Trivia" element={<ESPNSportsMillionaire />} />
        <Route
          path="personality-showdown"
          element={<ESPNPersonalityShowdown />}
        />
        <Route path="/sports-center" element={<SportsCenter />} />
        <Route path="*" element={<Navigate to="/Trivia_Showdown" replace />} />
      </Routes>
    </div>
  );
}

export default App;
