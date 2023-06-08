import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";
import Homepage from "./Pages/Homepage/Homepage";

function App() {




  return (
    <Router>
      <Routes >
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
