import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SurveyCreationStart from "./pages/SurveyCreationStart";
import Account from "./pages/Account";
import EditAccount from "./pages/EditAccount";
import SurveyFeed from "./pages/SurveyFeed";
import { ChakraProvider } from "@chakra-ui/react";
import OthersAccount from "./pages/OthersAccount";

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
              <Route path="/account/edit" element={<EditAccount />} />
              <Route path="/feed" element={<SurveyFeed />} />
              <Route path="/account/:username" element={<OthersAccount />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </>
    </ChakraProvider>
  );
}

export default App;
