import { useState } from 'react';
import styles from "./Modal.module.css"
import { LuMail } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { TfiMobile } from "react-icons/tfi";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";

function Modal() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({})

    const fetchLogin = async (email, password) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/user/login",
                {
                    email,
                    password,
                }
            );
            if (response.status === 200) {
                const user = await response.data;
                setUser(user);
                setIsLoggedIn(true)
            }
        } catch (error) {
            console.log("Login Error:", error);
        }
    }

    return (

        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>

                {/* Login */}
                <div className={styles.modalLeft}>
                    <h4>Log in to continue</h4>

                    <div className={styles.inputStyle}>
                        <LuMail />
                        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className={styles.inputStyle}>
                        <IoMdLock />
                        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className={styles.submitButton}>
                        <button className={styles.loginBtn} onClick={() => fetchLogin(email, password)}>Log in</button>
                    </div>

                </div>

                {/* Signup */}
                {/* <div className={styles.modalLeft}>
                    <h4>Signup to continue</h4>

                    <div className={styles.inputStyle}>
                        <FaUserAlt />
                        <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                    </div>

                    <div className={styles.inputStyle}>
                        <LuMail />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    </div>

                    <div className={styles.inputStyle}>
                        <TfiMobile />
                        <input type="tele" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='Mobile' />
                    </div>

                    <div className={styles.inputStyle}>
                        <IoMdLock />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    </div>

                    <p>Already have an account? <span >Login</span> </p>

                    <div className={styles.submitButton}>
                        <button className={styles.loginBtn} >Signup</button>
                        onClick={() => fetchRegister(name, email, mobile, password)}
                    </div>

                </div> */}

                {/* Add Product */}
                {/* <div className={styles.modalLeft}>

                    <h4>Add your product </h4>

                    <div className={styles.inputStyle}>
                        <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of the company' />
                    </div>

                    <div className={styles.inputStyle}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Category' />
                    </div>

                    <div className={styles.inputStyle}>
                        <input type="tele" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='Add logo url' />
                    </div>

                    <div className={styles.inputStyle}>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Link of product' />
                    </div>

                    <div className={styles.inputStyle}>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Add description' />
                    </div>

                    <div className={styles.submitButton}>
                        <button className={styles.loginBtn} >+ Add Product</button>
                        onClick={() => fetchRegister(name, email, mobile, password)}
                    </div>

                </div> */}

                {/* Right SIde */}
                <div className={styles.modalRight}>
                    <h4>Feedback</h4>
                    <p>Add your product and rate other items.............</p>
                </div>

            </div >
        </div >

    )
}
export default Modal;