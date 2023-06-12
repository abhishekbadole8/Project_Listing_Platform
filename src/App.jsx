import React, { useState } from "react";
import { UserContext } from "./UserContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";
import Homepage from "./Pages/Homepage/Homepage";

function App() {

  // LocalStorage TOken
  const [userToken, setUserToken] = useState(() => {
    const token = localStorage.getItem('userToken');
    return eval(token);
  });

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
        userToken, setUserToken, product, setProduct, user, setUser, inputProductValue, setInputProductValue
      }}>
      <Router>
        <Routes>

          <Route exact path="/" element={<Homepage />} />
          <Route path="/login" element={!userToken ? <Login /> : <Navigate to={'/'} />} />
          <Route path="/signup" element={!userToken ? <SignUp /> : <Navigate to={'/'} />} />
          <Route exact index path="/homepage" element={<Homepage />} />


        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
