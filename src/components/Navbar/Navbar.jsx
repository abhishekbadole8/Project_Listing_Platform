import styles from "./Navbar.module.css"
import user from "../../assets/user.svg"
import { useState } from "react";

function Navbar() {
    const [local, setLocal] = useState()

    return (
        <header>
            <label htmlFor="/Homepage" className={styles.logo}>Feedback</label>
            
            {local === undefined ?
                <div className={styles.authButton}>
                    <button >Login</button>
                    <button >Signup</button>
                </div> :
                <div className={styles.authDetail}>
                    <button >Logout</button>
                    <p>Hello! </p>
                    <img src={user} alt="user-img" />
                </div>
            }
        </header>
    )
}
export default Navbar;