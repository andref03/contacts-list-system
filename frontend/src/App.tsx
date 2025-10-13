import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import ContactList from "./pages/ContactList";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/list" element={<ContactList />} />
      </Routes>
    </Router>
  );
}
