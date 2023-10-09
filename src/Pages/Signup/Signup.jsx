import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css"
import { LuMail } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { TfiMobile } from "react-icons/tfi";
import { FaUserAlt } from "react-icons/fa";
import { UserContext } from "../../UserContext";
import axios from "axios";

function SignUp() {

    const navigate = useNavigate()
    const { BASE_URL } = useContext(UserContext)
    const [inputValue, setInputValue] = useState({ name: "", email: "", mobile: "", password: "" })
    const [isLoading, setIsLoading] = useState(false);
    const [resMsg, setResMsg] = useState(null)

    const handleChange = (e) => {
        setInputValue((prevValue) => ({
            ...prevValue, [e.target.name]: e.target.value
        }))
    }

    const fetchRegister = async () => {
        try {
            const response = await axios.post(BASE_URL + "/api/user/register", { ...inputValue });
            if (response) {
                const user = await response.data;
                if (user) {
                    setIsLoading(false)
                    navigate('/login', { state: { userCreated: "User Created, Please Login" } })
                }
            }
        } catch (error) {
            setIsLoading(false)
            setResMsg(error.response.data.message)
        }
    }
    // User Login Input Validation
    const validateRegisterInput = () => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const mobile_number_regex = /^(\+\d{1,3}[- ]?)?\d{10}$/

        let err = {}

        if (inputValue.name === "" && inputValue.email === "" && inputValue.mobile === "" && inputValue.password === "") {
            err.all = "All field's are Required"
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
            if (inputValue.name === "") {
                err.password = "Name Required"
            }
            if (inputValue.mobile === "") {
                err.mobile = "Mobile Number Required"
            } else if (!inputValue.mobile.match(mobile_number_regex)) {
                err.mobile = "Mobile Number Is Invalid"
            }
        }
        setResMsg(Object.values(err))
        return Object.keys(err).length < 1
    }

    const handleRegister = () => {
        const isValid = validateRegisterInput()

        if (isValid) {
            setIsLoading(true)
            fetchRegister()
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
                        <input type="name" name="name" value={inputValue.name} onChange={handleChange} placeholder='Name' />
                    </div>

                    <div className={styles.email}>
                        <LuMail size={21} />
                        <input type="email" name="email" value={inputValue.email} onChange={handleChange} placeholder='Email' />
                    </div>

                    <div className={styles.mobile}>
                        <TfiMobile size={23} />
                        <input type="tel" name="mobile" value={inputValue.mobile} onChange={handleChange} placeholder='Mobile' />
                    </div>

                    <div className={styles.password}>
                        <IoMdLock size={25} />
                        <input type="password" name="password" value={inputValue.password} onChange={handleChange} placeholder='Password' />
                    </div>

                    {resMsg && <label className={styles.errorMsg}>{resMsg.length > 1 ? resMsg.join(" & ") : resMsg}</label>}

                    <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span> </p>

                    <div className={styles.loginButton}>
                        <button className={styles.loginBtn} onClick={handleRegister} disabled={isLoading}>{isLoading ? 'Loading...' : 'Sign Up'}</button>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default SignUp;