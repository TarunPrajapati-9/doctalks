import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import HomePage from "./app/HomePage";
import LoginPage from "./app/LoginPage";
import NavBar from "./Component/NavBar";
import Booking from "./app/Booking";

import "./index.css";
import ChatBot from "./app/ChatBot";
import SignUp from "./app/SignUp";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Toaster
          containerStyle={{
            position: "relative",
            width: "100%",
          }}
          reverseOrder={false}
        />
        <AppContent />
      </QueryClientProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/signin" || location.pathname === "/signup";
  const authenticated = true;
  return (
    <>
      {!hideNavbar && <NavBar />}
      {authenticated ? (
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signin" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUp />} />
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
