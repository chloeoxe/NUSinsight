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
import Sidebar from "./components/Sidebar";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import OthersAccount from "./pages/OthersAccount";
import { useSelector } from "react-redux";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#f5f5f5",
      },
    },
  },
});

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <ChakraProvider resetCSS={false} theme={theme}>
      <>
        <Router>
          <div className="main-container">
            <Header />
            {user ? <Sidebar user={user} /> : ""}
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
