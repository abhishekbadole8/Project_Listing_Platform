import { useContext, useState } from 'react';
import styles from './Login.module.css'
import { LuMail } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import axios from 'axios';

function Login() {
    const navigate = useNavigate()
    const { BASE_URL } = useContext(UserContext)
    const [inputValue, setInputValue] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState([]);

    const handleChange = (e) => {
        setInputValue((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }))
    }

    const fetchLogin = async () => {
        try {
            const response = await axios.post(BASE_URL + "/api/user/login", { ...inputValue });
            if (response) {
                const user = await response.data;
                if (user) {
                    setIsLoading(false)
                    setInputValue({ email: "", password: "" })
                    localStorage.setItem('user_token', user)
                    navigate('/homepage')
                }
            }
        } catch (error) {
            setIsLoading(false)
            setError(error.response.data.message)
        }
    }

    // User Login Input Validation
    const validateLoginInput = () => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        let err = {}

        if (inputValue.email === "" && inputValue.password === "") {
            err.both = "Email and Password Required"
        } else {
            if (inputValue.email === "") {
                err.email = "Email Required"
            }
            else if (!inputValue.email.match(regex)) {
                err.email = "Email Is Invalid"
            }
            if (inputValue.password === "") {
                err.password = "Password Required"
            }
        }
        setError(Object.values(err))
        return Object.keys(err).length < 1
    }

    const handleLogin = () => {
        let isValid = validateLoginInput()

        if (isValid) {
            setIsLoading(true)
            fetchLogin()
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
                        <input type="email" placeholder='Email' name="email" value={inputValue.email} onChange={handleChange} />
                    </div>

                    <div className={styles.password}>
                        <IoMdLock size={25} />
                        <input type="password" placeholder='Password' name='password' value={inputValue.password} onChange={handleChange} />
                    </div>

                    {error && <label className={styles.errorMsg}>{error.length == 2 ? (error[0] + " & " + error[1]) : error}</label>}

                    <p>Dont have an account? <span onClick={() => navigate('/signup')}>SignUp</span></p>

                    <div className={styles.loginButton}>
                        <button className={styles.loginBtn} onClick={handleLogin} disabled={isLoading}>{isLoading ? 'Loading...' : 'Log in'}</button>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Login;