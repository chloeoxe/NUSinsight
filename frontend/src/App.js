import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SurveyCreationStart from "./pages/SurveyCreationStart";
import Account from "./pages/Account";
import SurveyFeed from "./pages/SurveyFeed";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider resetCSS={false}>
      <>
        <Router>
          <div className="container">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/createSurveyStart"
                element={<SurveyCreationStart />}
              />
              <Route path="/account" element={<Account />} />
              <Route path="/feed" element={<SurveyFeed />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </>
    </ChakraProvider>
  );
}

export default App;
