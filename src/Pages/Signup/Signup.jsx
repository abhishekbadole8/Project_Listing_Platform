import { useEffect, useState } from "react";
import styles from "./Signup.module.css"
import { LuMail } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { TfiMobile } from "react-icons/tfi";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {

    const navigate = useNavigate()
    const navigateLogin = () => {
        navigate('/login')
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({})

    const fetchRegister = async (name, email, mobile, password) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/user/register",
                {
                    name,
                    email,
                    mobile,
                    password,
                }
            );
            if (response) {
                const user = await response.data;
                console.log(user);
                setUser(user);
                setIsLoggedIn(true)
            }

        } catch (error) {
            console.log("Register Error", error);
        }
    }

    return (

        <div className={styles.AuthPage}>
            <div className={styles.AuthPagecontainer}>

                <div className={styles.headingBox}>
                    <h2>Feedback</h2>
                    <p>Add your products and give us your valuable feedback</p>
                </div>

                <div className={styles.AuthPageBox}>

                    <div className={styles.name}>
                        <FaUserAlt />
                        <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                    </div>

                    <div className={styles.email}>
                        <LuMail />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    </div>

                    <div className={styles.mobile}>
                        <TfiMobile />
                        <input type="tele" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='Mobile' />
                    </div>

                    <div className={styles.password}>
                        <IoMdLock />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    </div>

                    <p>Already have an account? <span onClick={navigateLogin}>Login</span> </p>

                    <div className={styles.loginButton}>
                        <button className={styles.loginBtn} onClick={() => fetchRegister(name, email, mobile, password)}>Sign Up</button>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default SignUp;