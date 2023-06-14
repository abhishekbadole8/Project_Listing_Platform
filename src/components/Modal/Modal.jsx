import { useContext, useEffect, useRef, useState } from 'react';
import styles from "./Modal.module.css"
import { LuMail } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { TfiMobile } from "react-icons/tfi";
import { FaUserAlt } from "react-icons/fa";
import { UserContext } from '../../UserContext';
import apiClient from "../apiClient/apiClient"

function Modal({ type, editProduct }) {

    const { setEditProductModal, loginModal, setLoginModal, signupModal, setSignupModal, addProductModal, setAddProductModal, user_token, user, setUser, inputProductValue, setInputProductValue } = useContext(UserContext)

    const [resMsg, setResMsg] = useState(null) //error response

    const modalRef = useRef(null) // ref for modal close

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
    const closeModal = () => {
        setLoginModal(false)
        setSignupModal(false)
        setAddProductModal(false)
        setEditProductModal(false)
        setResMsg(null)
        setUser({})
        setInputProductValue({})
    }

    const handleModalClick = (e) => {
        if (e.target === modalRef.current) {
            closeModal()
        }
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
            setResMsg(error.response?.data.message)
            console.log("Login Error:", error);
        }
    }

    //POST Create New User
    const fetchRegister = async (name, email, mobile, password) => {
        try {
            const response = await apiClient.post(
                "/api/user/register",
                {
                    name, email, mobile, password
                }
            );
            if (response.status === 200) {
                const user = await response.data;
                setUser(user)
                setSignupModal(false)
                setLoginModal(false)
                setInputProductValue({})
            }
        } catch (error) {
            setResMsg(error.response?.data.message)
            console.log("Register Error", error);
        }
    }

    //POST Create Product /api/product/add
    const addProduct = async (productData, userToken) => {
        try {
            let response
            if (editProduct) {
                const productId = editProduct._id
                // Patch Request
                response = await apiClient.patch(
                    `/api/product/${productId}`,
                    {
                        ...productData
                    }, {
                    headers: {
                        Authorization: 'Bearer ' + userToken
                    }
                });
            } else {
                // Post Request
                response = await apiClient.post(
                    "/api/product/add",
                    {
                        ...productData
                    }, {
                    headers: {
                        Authorization: 'Bearer ' + userToken
                    }
                });
            }
            if (response.status === 200) {
                await response.data;
                setAddProductModal(false)
                setEditProductModal(false)
                setInputProductValue({})
            }
        } catch (error) {
            setResMsg(error.response?.data.message)
            console.log('Error In Add Product ', error);
        }
    }

    useEffect(() => {
        //check type
        if (type === 'edit-Product' && editProduct) {
            setAddProductModal(true)
            setInputProductValue({ ...editProduct })
        } else {
            setInputProductValue({})
        }
    }, [type, editProduct])

    useEffect(() => {

    }, [loginModal, signupModal, addProductModal])

    return (
        <><div className={styles.modalBackground} ref={modalRef} onClick={handleModalClick}>

            <div className={styles.modalContainer} >

                <div className={styles.modalLeft}>

                    {/* Login */}
                    {loginModal &&
                        <>
                            <h4>Log in to continue</h4>

                            <div className={styles.inputStyle}>
                                <LuMail size={19} />
                                <input type="email" name="email" value={user.email} placeholder='Email' onChange={handelUserInput} />
                            </div>

                            <div className={styles.inputStyle}>
                                <IoMdLock size={22} />
                                <input type="password" name="password" value={user.password} placeholder='Password' onChange={handelUserInput} />
                            </div>

                            {resMsg && <label className={styles.errorMsg}>{resMsg}</label>}

                            <div className={styles.submitButton}>
                                <button className={styles.loginBtn} onClick={() => fetchLogin(user.email, user.password)}>Log in</button>
                            </div>
                        </>}

                    {/* Signup */}
                    {signupModal &&
                        <>
                            <h4>Signup to continue</h4>

                            <div className={styles.inputStyle}>
                                <FaUserAlt size={19} />
                                <input type="text" name="name" value={user.name} onChange={handelUserInput} placeholder='Name' />
                            </div>

                            <div className={styles.inputStyle}>
                                <LuMail size={19} />
                                <input type="email" name="email" value={user.email} onChange={handelUserInput} placeholder='Email' />
                            </div>

                            <div className={styles.inputStyle}>
                                <TfiMobile size={20} />
                                <input type="tele" name="mobile" value={user.mobile} onChange={handelUserInput} placeholder='Mobile' />
                            </div>

                            <div className={styles.inputStyle}>
                                <IoMdLock size={22} />
                                <input type="password" name="password" value={user.password} onChange={handelUserInput} placeholder='Password' />
                            </div>

                            {resMsg && <label className={styles.errorMsg}>{resMsg.slice(0, 81)}</label>}
                            <p>Already have an account? <span onClick={() => handelSignUpModal()}>Login</span> </p>

                            <div className={styles.submitButton}>
                                <button className={styles.loginBtn} onClick={() => fetchRegister(user.name, user.email, user.mobile, user.password)}>Signup</button>
                            </div>

                        </>}

                    {/* Add Product */}
                    {addProductModal &&
                        <>
                            <h4>{editProduct ? 'Edit' : 'Add'} your product </h4>

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
                            {resMsg && <label className={styles.errorMsg}>{resMsg}</label>}

                            <div className={styles.submitButton}>
                                <button className={styles.loginBtn} onClick={() => addProduct(inputProductValue, user_token)}> {editProduct ? 'Update Product' : '+ Add Product'}</button>
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

        </>)
}
export default Modal;