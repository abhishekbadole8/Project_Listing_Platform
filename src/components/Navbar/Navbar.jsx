import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import styles from "./Navbar.module.css"
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
    const navigate = useNavigate()

    const { user_token } = useContext(UserContext)

    return (

        <header>
            <label htmlFor="/Homepage" className={styles.logo}>Feedback</label>

            {user_token !== null ?
                <div className={styles.authDetail}>
                    <button onClick={() => localStorage.removeItem('user_token')}>Logout</button>
                    <p>Hello! </p>
                    <FaUserCircle size={38} />
                </div> :

                <div className={styles.authButton}>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/signup')}>Signup</button>
                </div>

            }
        </header>

    )
}
export default Navbar;