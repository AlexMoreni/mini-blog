import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//context
import { AuthProvider } from "./context/AuthContext.jsx";

//Pages
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import CreatePost from "./pages/CreatePost/CreatePost.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

//Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando..</p>;
  }

  return (
    <AuthProvider value={{ user }}>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/posts/create"
              element={user ? <CreatePost /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
