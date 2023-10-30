import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
