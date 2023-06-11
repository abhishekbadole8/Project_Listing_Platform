import { useContext, useEffect, useState } from 'react';
import styles from "./Modal.module.css"
import { LuMail } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { TfiMobile } from "react-icons/tfi";
import { FaUserAlt } from "react-icons/fa";
import { UserContext } from '../../UserContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import apiClient from "../apiClient/apiClient"

function Modal() {
    const navigate = useNavigate()
    const { loginModal, setLoginModal, signupModal, setSignupModal, addProductModal, setAddProductModal, user_token, user, setUser, inputProductValue, setInputProductValue } = useContext(UserContext)

    const [isModalOpen, setIsModalOpen] = useState(false) // Modal Close State

    const handelUserInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handelProductInput = (e) => {
        setInputProductValue({ ...inputProductValue, [e.target.name]: e.target.value })
    }
    const handelCategoryInput = (e) => {
        const newCategory = e.target.value.split(',')
        setInputProductValue({ ...inputProductValue, category: newCategory })
    }
    const handelSignUpModal = () => {
        setLoginModal(true)
        setSignupModal(false)
    }

    // POST Login /api/user/login
    const fetchLogin = async (email, password) => {
        try {
            const response = await apiClient.post(
                "/api/user/login",
                {
                    email,
                    password
                }
            );
            if (response.status === 200) {
                const user = await response.data;
                if (user) {
                    localStorage.setItem('user_token', JSON.stringify(user))
                    setLoginModal(false)
                    setUser({})
                }
            }
        } catch (error) {
            console.log("Login Error:", error);
        }
    }

    //POST Create New User
    const fetchRegister = async (name, email, mobile, password) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/user/register",
                {
                    name, email, mobile, password
                }
            );
            if (response.status == 200) {
                const user = await response.data;
                setUser(user)
                setSignupModal(false)
                setLoginModal(false)
                setInputProductValue({})
            }
        } catch (error) {
            console.log("Register Error", error);
        }
    }

    //POST Create Product /api/product/add
    const addProduct = async (productData, user_token) => {
        try {
            const response = await apiClient.post(
                "/api/product/add",
                {
                    ...productData
                }, {
                headers: {
                    Authorization: 'Bearer ' + user_token
                }
            }
            );
            if (response.status === 200) {
                const data = await response.data;
                setAddProductModal(false)
            }
        } catch (error) {
            console.log('Error In Add Product ', error);
        }
    }
   

    useEffect(() => {

    }, [loginModal, signupModal, addProductModal])
    return (
        <>
            {!isModalOpen &&
                <div className={styles.modalBackground} >

                    <div className={styles.modalContainer} >

                        <div className={styles.modalLeft}>

                            {/* Login */}
                            {loginModal === true &&
                                <>
                                    <h4>Log in to continue</h4>

                                    <div className={styles.inputStyle}>
                                        <LuMail />
                                        <input type="email" name="email" value={user.email} placeholder='Email' onChange={handelUserInput} />
                                    </div>

                                    <div className={styles.inputStyle}>
                                        <IoMdLock />
                                        <input type="password" name="password" value={user.password} placeholder='Password' onChange={handelUserInput} />
                                    </div>

                                    <div className={styles.submitButton}>
                                        <button className={styles.loginBtn} onClick={() => fetchLogin(user.email, user.password)}>Log in</button>
                                    </div>
                                </>}

                            {/* Signup */}
                            {signupModal === true &&
                                <>
                                    <h4>Signup to continue</h4>

                                    <div className={styles.inputStyle}>
                                        <FaUserAlt />
                                        <input type="text" name="name" value={user.name} onChange={handelUserInput} placeholder='Name' />
                                    </div>

                                    <div className={styles.inputStyle}>
                                        <LuMail />
                                        <input type="email" name="email" value={user.email} onChange={handelUserInput} placeholder='Email' />
                                    </div>

                                    <div className={styles.inputStyle}>
                                        <TfiMobile />
                                        <input type="tele" name="mobile" value={user.mobile} onChange={handelUserInput} placeholder='Mobile' />
                                    </div>

                                    <div className={styles.inputStyle}>
                                        <IoMdLock />
                                        <input type="password" name="password" value={user.password} onChange={handelUserInput} placeholder='Password' />
                                    </div>

                                    <p>Already have an account? <span onClick={() => handelSignUpModal()}>Login</span> </p>

                                    <div className={styles.submitButton}>
                                        <button className={styles.loginBtn} onClick={() => fetchRegister(user.name, user.email, user.mobile, user.password)}>Signup</button>
                                    </div>

                                </>}

                            {/* Add Product */}
                            {addProductModal === true &&
                                <>
                                    <h4>Add your product </h4>

                                    <div className={styles.inputStyle}>
                                        <input type="text" name="title" value={inputProductValue.title} onChange={handelProductInput} placeholder='Name of the company' />
                                    </div>

                                    <div className={styles.inputStyle}>
                                        <input type="text" name="category" value={inputProductValue.category} onChange={(e) => handelCategoryInput(e)} placeholder='Category' />
                                    </div>

                                    <div className={styles.inputStyle}>
                                        <input type="text" name="logo_url" value={inputProductValue.logo_url} onChange={handelProductInput} placeholder='Add logo url' />
                                    </div>

                                    <div className={styles.inputStyle}>
                                        <input type="text" name="product_link" value={inputProductValue.product_link} onChange={handelProductInput} placeholder='Link of product' />
                                    </div>

                                    <div className={styles.inputStyle}>
                                        <input type="text" name="description" value={inputProductValue.description} onChange={handelProductInput} placeholder='Add description' />
                                    </div>

                                    <div className={styles.submitButton}>
                                        <button className={styles.loginBtn} onClick={() => addProduct(inputProductValue, user_token)}>+ Add Product</button>
                                    </div>

                                </>}

                        </div>

                        {/* Right SIde */}
                        <div className={styles.modalRight}>
                            <h4>Feedback</h4>
                            <p>Add your product and rate other items.............</p>
                        </div>

                    </div >
                </div >
            }

        </>)
}
export default Modal;