import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Create from "./pages/Create";
import Home from "./pages/Home";
import VidyaBharti from "./pages/VidyaBharti";

function App() {
    return (
        <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vidya-bharti" element={<VidyaBharti />} />
            </Routes>
        </>
    );
}

export default App;
