import { useEffect, useState } from 'react';
import styles from './Login.module.css'
import { LuMail } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import apiClient from "../../components/apiClient/apiClient"
import axios from "axios"

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [resMsg, setResMsg] = useState(null)

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
                if (user) {
                    localStorage.setItem('userToken', JSON.stringify(user))
                    navigate('/homepage')
                }
            }
        } catch (error) {
            setResMsg(error.response?.data.message)
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
                        <LuMail size={22} />
                        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className={styles.password}>
                        <IoMdLock size={25} />
                        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {resMsg && <label className={styles.errorMsg}>{resMsg}</label>}

                    <p>Dont have an account? <span onClick={() => navigate('/signup')}>SignUp</span></p>

                    <div className={styles.loginButton}>
                        <button className={styles.loginBtn} onClick={() => fetchLogin(email, password)}>Log in</button>
                    </div>

                </div>

            </div>
        </div>)
}
export default Login;