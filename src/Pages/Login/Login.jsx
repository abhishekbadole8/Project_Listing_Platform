import styles from './Login.module.css'
import { LuMail } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";

function Login() {

    const navigate = useNavigate()
    const navigateSignup = () => {
        navigate('/signup')
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState('')
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
        <div className={styles.AuthPage}>

            <div className={styles.AuthPagecontainer}>

                <div className={styles.headingBox}>
                    <h2>Feedback</h2>
                    <p>Add your products and give us your valuable feedback</p>
                </div>

                <div className={styles.AuthPageLoginBox}>

                    <div className={styles.email}>
                        <LuMail />
                        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className={styles.password}>
                        <IoMdLock />
                        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <p>Dont have an account? <span onClick={navigateSignup}>SignUp</span></p>

                    <div className={styles.loginButton}>
                        <button className={styles.loginBtn} onClick={() => fetchLogin(email, password)}>Log in</button>
                    </div>

                </div>

            </div>
        </div>)
}
export default Login;