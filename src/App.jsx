import React, { useState } from "react";
import { UserContext } from "./UserContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";
import Homepage from "./Pages/Homepage/Homepage";

function App() {

  const user_token = eval(localStorage.getItem('user_token')) // LocalStorage TOken

  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [product, setProduct] = useState([]) // Products Saved Here 

  // User Inputs
  const [user, setUser] = useState({ name: "", email: "", mobile: "", password: "" })
  // Product Inputs
  const [inputProductValue, setInputProductValue] = useState({ title: "", category: [], logo_url: "", product_link: "", description: "", vote: "", comments: [] })

  return (
    <UserContext.Provider
      value={{
        loginModal, setLoginModal, signupModal, setSignupModal, addProductModal, setAddProductModal,
        user_token, product, setProduct, user, setUser, inputProductValue, setInputProductValue
      }}>
      <Router>
        <Routes>

          <Route exact path="/" element={<Homepage />} />
          <Route path="/login" element={!user_token ? <Login /> : <Navigate to={'/'} />} />
          <Route path="/signup" element={!user_token ? <SignUp /> : <Navigate to={'/'} />} />
          <Route exact index path="/homepage" element={<Homepage />} />


        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
