import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import styles from './Login.module.css'
import { LuMail } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()

    const { local, setLocal,setAddProductModal } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                    localStorage.setItem('user_token', JSON.stringify(user))
                    navigate('/homepage')
                }
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
                        <LuMail size={22} />
                        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className={styles.password}>
                        <IoMdLock size={25}/>
                        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <p>Dont have an account? <span onClick={() => navigate('/signup')}>SignUp</span></p>

                    <div className={styles.loginButton}>
                        <button className={styles.loginBtn} onClick={() => fetchLogin(email, password)}>Log in</button>
                    </div>

                </div>

            </div>
        </div>)
}
export default Login;