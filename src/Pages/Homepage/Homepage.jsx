import styles from './Homepage.module.css'
import Navbar from '../../components/Navbar/Navbar';
import loud from "../../assets/loud.svg"
import cred from "../../assets/cred.svg"
import { TbMessage2 } from "react-icons/tb";
import { BsChatRightFill } from "react-icons/bs";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useState } from 'react';
import Comment from '../../components/Comment/Comment';
import Modal from '../../components/Modal/Modal';

function Homepage() {

    
    const [comment, setComment] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const [signupModal, setSignupModal] = useState(false)
    const [addProductModal, setAddProductModal] = useState(false)

    return (
        <div className={styles.bodyMain}>
            <div className={styles.bodyContainer}>
                <Navbar />

                {/* Poster Container */}
                <div className={styles.posterCotainer}>
                    <img src={loud} alt="poster" />
                    <div className={styles.heading}>
                        <h3>Add your products and give your valuable feedback</h3>
                        <p>Easily give your feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time</p>
                    </div>
                </div>

                {/* DrownContainer */}
                <div className={styles.mainContainer}>

                    {/* Filter Container */}
                    <div className={styles.filterContainer}>

                        {/* Up */}
                        <div className={styles.filterUpBox}>
                            <h4>Feedback</h4>
                            <p>Apply Filter</p>
                        </div>

                        {/* Down */}
                        <div className={styles.filterDownBox}>

                            <p className={styles.filterTags}>All</p>
                            <p className={styles.filterTags}>Fintech</p>
                            <p className={styles.filterTags}>Edtech</p>
                            <p className={styles.filterTags}>B2B</p>
                            <p className={styles.filterTags}>Saas</p>

                        </div>
                    </div>

                    {/* Project Container */}
                    <div className={styles.projectsContainer}>

                        {/* Top Bar */}
                        <div className={styles.projectsTopBar}>

                            <div className={styles.projectsTopBarLeft}>
                                <h5>10 Suggestions</h5>

                                <div className={styles.sortDiv}>
                                    <p>Sort by:</p>
                                    <select name="" id="">
                                        <option value="">Upvotes</option>
                                        <option value="">Comments</option>
                                    </select>
                                </div>

                            </div>

                            {/* Add Product Button */}
                            <div className={styles.projectsTopBarRight}>
                                <button onClick={() => setLoginModal(true)}>+ Add Product</button>
                            </div>

                        </div>

                        {/* Product Boxs Container */}
                        <div className={styles.productsBoxContainer} >

                            {/* Product Box 1 */}
                            <div className={styles.projectsBox}>

                                {/* Box up Fixed */}
                                <div className={styles.projectBoxUp}>

                                    {/* Box Left */}
                                    <div className={styles.projectDetailsBoxLeft}>

                                        <div className={styles.projectLogo}>
                                            <img src={cred} alt="cred-logo" id={styles.projectLogo} />
                                        </div>

                                        <div className={styles.jobDetailsInfo}>

                                            {/* Job Detail Layer 1 */}
                                            <h5>Cred Club</h5>

                                            {/* Job Detail Layer 2 */}
                                            <div className={styles.jobDetails}>
                                                <p>It is good for credit card payments,it is fast,secure</p>
                                            </div>

                                            {/* Job Detail Layer 3 */}
                                            <div className={styles.typeDetails}>

                                                <div className={styles.projectType}>
                                                    <p>Fintech</p>
                                                    <p>B2B</p>
                                                </div>

                                                <div className={styles.projectComments}>
                                                    <TbMessage2 />
                                                    <p onClick={() => setComment(true)}>Comment</p>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Box Right */}
                                    <div className={styles.projectDetailsBoxRight}>

                                        <div className={styles.projectEditButtonDiv}>
                                            <button>Edit</button>
                                        </div>

                                        <div className={styles.projectTagsDiv}>

                                            <div className={styles.upVoteCountTag}>
                                                <MdKeyboardArrowUp />
                                                <p>112</p>
                                            </div>

                                            <div className={styles.commentCountTag}>
                                                <p>4</p>
                                                <BsChatRightFill />
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Comments Toggle*/}
                                {comment && <Comment />}


                            </div>

                            {/* Product Box 2 */}
                            <div className={styles.projectsBox}>

                                {/* Box up Fixed */}

                                <div className={styles.projectBoxUp}>

                                    {/* Box Left */}
                                    <div className={styles.projectDetailsBoxLeft}>

                                        <div className={styles.projectLogo}>
                                            <img src={cred} alt="cred-logo" id={styles.projectLogo} />
                                        </div>

                                        <div className={styles.jobDetailsInfo}>

                                            {/* Job Detail Layer 1 */}
                                            <h5>Cred Club</h5>

                                            {/* Job Detail Layer 2 */}
                                            <div className={styles.jobDetails}>
                                                <p>It is good for credit card payments,it is fast,secure</p>
                                            </div>

                                            {/* Job Detail Layer 3 */}
                                            <div className={styles.typeDetails}>

                                                <div className={styles.projectType}>
                                                    <p>Fintech</p>
                                                    <p>B2B</p>
                                                </div>

                                                <div className={styles.projectComments}>
                                                    <TbMessage2 />
                                                    <p onClick={() => setComment(true)}>Comment</p>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Box Right */}
                                    <div className={styles.projectDetailsBoxRight}>

                                        <div className={styles.projectEditButtonDiv}>
                                            <button>Edit</button>
                                        </div>

                                        <div className={styles.projectTagsDiv}>

                                            <div className={styles.upVoteCountTag}>
                                                <MdKeyboardArrowUp />
                                                <p>112</p>
                                            </div>

                                            <div className={styles.commentCountTag}>
                                                <p>4</p>
                                                <BsChatRightFill />
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Comments Toggle*/}

                                {!comment ? null : <Comment />}


                            </div>

                            {/* Product Box 3 */}
                            <div className={styles.projectsBox}>

                                {/* Box up Fixed */}

                                <div className={styles.projectBoxUp}>

                                    {/* Box Left */}
                                    <div className={styles.projectDetailsBoxLeft}>

                                        <div className={styles.projectLogo}>
                                            <img src={cred} alt="cred-logo" id={styles.projectLogo} />
                                        </div>

                                        <div className={styles.jobDetailsInfo}>

                                            {/* Job Detail Layer 1 */}
                                            <h5>Cred Club</h5>

                                            {/* Job Detail Layer 2 */}
                                            <div className={styles.jobDetails}>
                                                <p>It is good for credit card payments,it is fast,secure</p>
                                            </div>

                                            {/* Job Detail Layer 3 */}
                                            <div className={styles.typeDetails}>

                                                <div className={styles.projectType}>
                                                    <p>Fintech</p>
                                                    <p>B2B</p>
                                                </div>

                                                <div className={styles.projectComments}>
                                                    <TbMessage2 />
                                                    <p onClick={() => setComment(true)}>Comment</p>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Box Right */}
                                    <div className={styles.projectDetailsBoxRight}>

                                        <div className={styles.projectEditButtonDiv}>
                                            <button>Edit</button>
                                        </div>

                                        <div className={styles.projectTagsDiv}>

                                            <div className={styles.upVoteCountTag}>
                                                <MdKeyboardArrowUp />
                                                <p>112</p>
                                            </div>

                                            <div className={styles.commentCountTag}>
                                                <p>4</p>
                                                <BsChatRightFill />
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Comments Toggle*/}

                                {!comment ? null : <Comment />}


                            </div>

                            {/* Product Box 4 */}
                            <div className={styles.projectsBox}>

                                {/* Box up Fixed */}

                                <div className={styles.projectBoxUp}>

                                    {/* Box Left */}
                                    <div className={styles.projectDetailsBoxLeft}>

                                        <div className={styles.projectLogo}>
                                            <img src={cred} alt="cred-logo" id={styles.projectLogo} />
                                        </div>

                                        <div className={styles.jobDetailsInfo}>

                                            {/* Job Detail Layer 1 */}
                                            <h5>Cred Club</h5>

                                            {/* Job Detail Layer 2 */}
                                            <div className={styles.jobDetails}>
                                                <p>It is good for credit card payments,it is fast,secure</p>
                                            </div>

                                            {/* Job Detail Layer 3 */}
                                            <div className={styles.typeDetails}>

                                                <div className={styles.projectType}>
                                                    <p>Fintech</p>
                                                    <p>B2B</p>
                                                </div>

                                                <div className={styles.projectComments}>
                                                    <TbMessage2 />
                                                    <p onClick={() => setComment(true)}>Comment</p>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Box Right */}
                                    <div className={styles.projectDetailsBoxRight}>

                                        <div className={styles.projectEditButtonDiv}>
                                            <button>Edit</button>
                                        </div>

                                        <div className={styles.projectTagsDiv}>

                                            <div className={styles.upVoteCountTag}>
                                                <MdKeyboardArrowUp />
                                                <p>112</p>
                                            </div>

                                            <div className={styles.commentCountTag}>
                                                <p>4</p>
                                                <BsChatRightFill />
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Comments Toggle*/}

                                {!comment ? null : <Comment />}


                            </div>

                            {/* Product Box 5 */}
                            <div className={styles.projectsBox}>

                                {/* Box up Fixed */}

                                <div className={styles.projectBoxUp}>

                                    {/* Box Left */}
                                    <div className={styles.projectDetailsBoxLeft}>

                                        <div className={styles.projectLogo}>
                                            <img src={cred} alt="cred-logo" id={styles.projectLogo} />
                                        </div>

                                        <div className={styles.jobDetailsInfo}>

                                            {/* Job Detail Layer 1 */}
                                            <h5>Cred Club</h5>

                                            {/* Job Detail Layer 2 */}
                                            <div className={styles.jobDetails}>
                                                <p>It is good for credit card payments,it is fast,secure</p>
                                            </div>

                                            {/* Job Detail Layer 3 */}
                                            <div className={styles.typeDetails}>

                                                <div className={styles.projectType}>
                                                    <p>Fintech</p>
                                                    <p>B2B</p>
                                                </div>

                                                <div className={styles.projectComments}>
                                                    <TbMessage2 />
                                                    <p onClick={() => setComment(true)}>Comment</p>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Box Right */}
                                    <div className={styles.projectDetailsBoxRight}>

                                        <div className={styles.projectEditButtonDiv}>
                                            <button>Edit</button>
                                        </div>

                                        <div className={styles.projectTagsDiv}>

                                            <div className={styles.upVoteCountTag}>
                                                <MdKeyboardArrowUp />
                                                <p>112</p>
                                            </div>

                                            <div className={styles.commentCountTag}>
                                                <p>4</p>
                                                <BsChatRightFill />
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Comments Toggle*/}

                                {!comment ? null : <Comment />}


                            </div>

                        </div>

                    </div >

                </div >

            </div >
            {loginModal && <Modal />}

        </div >

    )
}
export default Homepage;