import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css"
import { LuMail } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { TfiMobile } from "react-icons/tfi";
import { FaUserAlt } from "react-icons/fa";
import apiClient from "../../components/apiClient/apiClient"

function SignUp() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    const [resMsg, setResMsg] = useState(null)

    const fetchRegister = async (name, email, mobile, password) => {
        try {
            const response = await apiClient.post(
                "/api/user/register",
                {
                    name,
                    email,
                    mobile,
                    password,
                }
            );
            if (response.status === 200) {
                const user = await response.data;
                if (user) {
                    navigate('/login')
                }
            }
        } catch (error) {
            setResMsg(error.response.data.message)
        }
    }
    // User Login Input Validation
    const validateRegisterInput = () => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const mobile_number_regex = /^(\+\d{1,3}[- ]?)?\d{10}$/

        let err = {}

        if (name === "" && email === "" && mobile === "" && password === "") {
            err.all = "All field's are Required"
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
            if (name === "") {
                err.password = "Name Required"
            }
            if (mobile === "") {
                err.mobile = "Mobile Number Required"
            } else if (!mobile.match(mobile_number_regex)) {
                err.mobile = "Mobile Number Is Invalid"
            }
        }
        setResMsg(Object.values(err))
        return Object.keys(err).length < 1
    }

    const handleRegister = () => {
        const isValid = validateRegisterInput()

        if (isValid) {
            fetchRegister(name, email, mobile, password)
            setResMsg(null)
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
                        <FaUserAlt size={21} />
                        <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                    </div>

                    <div className={styles.email}>
                        <LuMail size={21} />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    </div>

                    <div className={styles.mobile}>
                        <TfiMobile size={23} />
                        <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='Mobile' />
                    </div>

                    <div className={styles.password}>
                        <IoMdLock size={25} />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    </div>

                    {resMsg && <label className={styles.errorMsg}>{resMsg.length > 1 ? resMsg.join(" & ") : resMsg}</label>}

                    <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span> </p>

                    <div className={styles.loginButton}>
                        <button className={styles.loginBtn} onClick={handleRegister}>Sign Up</button>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default SignUp;