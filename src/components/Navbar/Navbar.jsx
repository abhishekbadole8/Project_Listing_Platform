import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import styles from "./Navbar.module.css"
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
    const navigate = useNavigate()

    const { user_token } = useContext(UserContext)
    const [user_token_val, setUser_token_val] = useState(localStorage.getItem('user_token'))

    const handelLogout = () => {
        localStorage.removeItem('user_token')
        setUser_token_val(null)
        // navigate('/login', { replace: true })
    }

    useEffect(() => {
        setUser_token_val(localStorage.getItem('user_token'))
    }, [user_token])
    
    return (

        <header>
            <label htmlFor="/Homepage" className={styles.logo}>Feedback</label>

            {user_token_val !== null ?
                <div className={styles.authDetail}>
                    <button onClick={handelLogout}>Logout</button>
                    <p>Hello! </p>
                    <FaUserCircle size={38} />
                </div> :

                <div className={styles.authButton}>
                    <button onClick={() => navigate('/login', { replace: true })}>Login</button>
                    <button onClick={() => navigate('/signup', { replace: true })}>Signup</button>
                </div>

            }
        </header>

    )
}
export default Navbar;