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
import  { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Cookies from "js-cookie";
import Doctordetail from "./app/Doctordetail";
import Userdata from "./Context/UserData";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  // const navigate = useNavigate();
  // const isUserAuthenticated = () => {
  //   const token = Cookies.get("token");
  //   toast.error("Please login to continue");

  //   navigate("/signin");
  //   return !!token;
  // };
  return (
    <Router>
    {/* user data is context.. */}
      <Userdata>
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
      </Userdata>
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
          <Route exact path="/detail/:docId" element={<Doctordetail />} />
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
