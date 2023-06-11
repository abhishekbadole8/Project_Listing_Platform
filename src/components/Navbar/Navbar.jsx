import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import styles from "./Navbar.module.css"
import user from "../../assets/user.svg"


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
                    <img src={user} alt="user-img" />
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