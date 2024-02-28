import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./app/HomePage";
import LoginPage from "./app/LoginPage";
import NavBar from "./Component/NavBar";
import Booking from "./app/Booking";

import "./index.css";
import ChatBot from "./app/ChatBot";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/signin";
  const authenticated = true;
  return (
    <>
      {!hideNavbar && <NavBar />}
      {authenticated ? (
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signin" element={<LoginPage />} />
          <Route exact path="/booking" element={<Booking />} />
          <Route exact path="/chatbot" element={<ChatBot />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/signin" element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
