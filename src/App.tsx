import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Avatars } from "./pages/Avatars";

function App() {
  return (
    <Router>
      <div className="min-h-lvh">
        <main className="w-full mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/avatars" element={<Avatars />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
