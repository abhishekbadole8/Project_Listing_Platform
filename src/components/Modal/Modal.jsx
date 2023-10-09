import { useContext, useEffect, useRef, useState } from 'react';
import styles from "./Modal.module.css"
import { LuMail } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { TfiMobile } from "react-icons/tfi";
import { FaUserAlt } from "react-icons/fa";
import { UserContext } from '../../UserContext';
import axios from 'axios';

function Modal({ type, editProduct }) {

    const { BASE_URL, setEditProductModal, loginModal, setLoginModal, signupModal, setSignupModal, addProductModal, setAddProductModal, user_token, user, setUser, inputProductValue, setInputProductValue } = useContext(UserContext)

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
        setResMsg(null)
    }

    const handleModalClick = (e) => {
        if (e.target === modalRef.current) {
            closeModal()
        }
    }

    // POST Login /api/user/login
    const fetchLogin = async (email, password) => {
        try {
            const response = await axios.post(BASE_URL + "/api/user/login",
                {
                    email,
                    password
                }
            );
            if (response) {
                const user = await response.data;
                if (user) {
                    localStorage.setItem('user_token', JSON.stringify(user))
                    setLoginModal(false)
                    setUser({ name: "", email: "", mobile: "", password: "" })
                }
            }
        } catch (error) {
            setResMsg(error.response.data.message)
        }
    }

    // User Login Input Validation
    const validateLoginInput = () => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        let err = {}

        if (user.email === "" && user.password === "") {
            err.both = "Email and Password Required"
        } else {
            if (user.email === "") {
                err.email = "Email Required"
            }
            else if (!user.email.match(regex)) {
                err.email = "Email Is Invalid"
            }
            if (user.password === "") {
                err.password = "Password Required"
            }
        }
        setResMsg(Object.values(err))
        return Object.keys(err).length < 1
    }

    // Handle Login Click
    const handleLogin = () => {
        const isValid = validateLoginInput()

        if (isValid) {
            fetchLogin(user.email, user.password)
            setResMsg(null)
        }
    }

    //POST Create New User
    const fetchRegister = async () => {
        try {
            const response = await axios.post(BASE_URL + "/api/user/register", { user });
            if (response) {
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

    // User Register Input Validation
    const validateRegisterInput = () => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const mobile_number_regex = /^(\+\d{1,3}[- ]?)?\d{10}$/

        let err = {}

        if (user.name === "" && user.email === "" && user.mobile === "" && user.password === "") {
            err.all = "All field's are Required"
        } else {
            if (user.email === "") {
                err.email = "Email Required"
            }
            else if (!user.email.match(regex)) {
                err.email = "Email Is Invalid"
            }
            if (user.password === "") {
                err.password = "Password Required"
            }
            if (user.name === "") {
                err.password = "Name Required"
            }
            if (user.mobile === "") {
                err.mobile = "Mobile Number Required"
            } else if (!user.mobile.match(mobile_number_regex)) {
                err.mobile = "Mobile Number Is Invalid"
            }
        }
        setResMsg(Object.values(err))
        return Object.keys(err).length < 1
    }

    const handleRegister = () => {
        const isValid = validateRegisterInput()

        if (isValid) {
            fetchRegister(user.name, user.email, user.mobile, user.password)
            setResMsg(null)
        }
    }
    //POST Create Product /api/product/add
    const addProduct = async (productData, userToken) => {
        try {
            let response
            if (editProduct) {
                const productId = editProduct._id
                // Patch Request
                response = await axios.patch(BASE_URL + `/api/product/${productId}`,
                    {
                        ...productData
                    }, {
                    headers: {
                        Authorization: 'Bearer ' + userToken
                    }
                });
            } else {
                // Post Request
                response = await axios.post(BASE_URL + "/api/product/add", {
                    ...productData
                }, {
                    headers: {
                        Authorization: 'Bearer ' + userToken
                    }
                });
            }
            if (response) {
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

                            {resMsg && <label className={styles.errorMsg}>{resMsg.length == 2 ? (resMsg[0] + " & " + resMsg[1]) : resMsg}</label>}

                            <div className={styles.submitButton}>
                                <button className={styles.loginBtn} onClick={handleLogin}>Log in</button>
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
                                <input type="tel" name="mobile" value={user.mobile} onChange={handelUserInput} placeholder='Mobile' />
                            </div>

                            <div className={styles.inputStyle}>
                                <IoMdLock size={22} />
                                <input type="password" name="password" value={user.password} onChange={handelUserInput} placeholder='Password' />
                            </div>

                            {resMsg && <label className={styles.errorMsg}>{resMsg.length > 1 ? resMsg.join(" & ") : resMsg}</label>}

                            <p>Already have an account? <span onClick={() => handelSignUpModal()}>Login</span> </p>

                            <div className={styles.submitButton}>
                                <button className={styles.loginBtn} onClick={handleRegister}>Signup</button>
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