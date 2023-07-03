import { useState } from 'react';
import styles from './Login.module.css'
import { LuMail } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import apiClient from "../../components/apiClient/apiClient"

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState([])

    const fetchLogin = async (email, password) => {
        try {
            const response = await apiClient.post(
                "/api/user/login",
                {
                    email,
                    password,
                }
            );
            if (response.status === 200) {
                const user = await response.data;

                if (user) {
                    localStorage.setItem('user_token', user)
                    navigate('/homepage')
                }
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    // User Login Input Validation
    const validateLoginInput = () => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        let err = {}

        if (email === "" && password === "") {
            err.both = "Email and Password Required"
        } else {
            if (email === "") {
                err.email = "Email Required"
            }
            else if (!email.match(regex)) {
                err.email = "Email Is Invalid"
            }
            if (password === "") {
                err.password = "Password Required"
            }
        }
        setError(Object.values(err))
        return Object.keys(err).length < 1
    }

    const handleLogin = () => {
        let isValid = validateLoginInput()

        if (isValid) {
            fetchLogin(email, password)
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

                    {error && <label className={styles.errorMsg}>{error.length == 2 ? (error[0] + " & " + error[1]) : error}</label>}

                    <p>Dont have an account? <span onClick={() => navigate('/signup')}>SignUp</span></p>

                    <div className={styles.loginButton}>
                        <button className={styles.loginBtn} onClick={handleLogin}>Log in</button>
                    </div>

                </div>

            </div>
        </div>)
}
export default Login;