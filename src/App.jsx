import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BingoCricket from "./game/bingo-cricket";
import FoxMillionaireTrivia from "./game/fox-millionaire-trivia";
import FoxTriviaShowdown from "./game/fox-trivia-showdown";
import ESPNSportsMillionaire from "./game/millionaire-trivia";
import ESPNPersonalityShowdown from "./game/personality-showdown";
import SportsCenter from "./game/sports-center";
import TriviaShowdown from "./game/trivia-showdown";

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
        <Route path="/fox-trivia-showdown" element={<FoxTriviaShowdown />} />
        <Route path="/fox-millionaire-trivia" element={<FoxMillionaireTrivia />} />
        <Route path="/bingo-cricket" element={<BingoCricket />} />
        <Route path="*" element={<Navigate to="/Trivia_Showdown" replace />} />
      </Routes>
    </div>
  );
}

export default App;
