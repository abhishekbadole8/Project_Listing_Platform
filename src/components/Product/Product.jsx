import styles from "./Product.module.css"
import { TbMessage2 } from "react-icons/tb";
import { BsChatRightFill } from "react-icons/bs";
import { MdKeyboardArrowUp } from "react-icons/md";
import Comment from "../Comment/Comment";

function Product({ product, userId, isActive, filterClickBoxId, getProducts, handelVoteCount, user_token, handelEditClick }) {

    const { _id, user_id, title, description, category, logo_url, comments, vote } = product

    return (
        <>
            <div className={styles.projectsBox} >

                <div className={styles.projectBoxUp}>

                    {/* Box Left */}
                    <div className={styles.projectDetailsBoxLeft}>

                        <div className={styles.projectLogo}>
                            <img src={logo_url} alt="logo" id={styles.projectLogo} />
                        </div>

                        <div className={styles.jobDetailsInfo}>

                            <h5>{title}</h5>

                            <div className={styles.jobDetails}>
                                <p>{description}</p>
                            </div>

                            <div className={styles.typeDetails}>

                                {category.map((cat, i) => {
                                    return (
                                        <div className={styles.projectType} key={i}>
                                            <p>{cat}</p>
                                        </div>)
                                })}

                                <div className={styles.projectComments} onClick={() => filterClickBoxId(_id)}>
                                    <TbMessage2 size={25} />

                                    {/* Comment Button Here */}
                                    <p>Comments</p>
                                </div>

                                {/* Edit Button */}
                                {user_token && user_id === userId &&
                                    (<div className={styles.projectEditButtonDiv}>

                                        <button onClick={() => handelEditClick(product)}>Edit</button>

                                    </div>)}

                            </div>

                        </div>

                    </div>

                    {/* Box Right */}
                    <div className={styles.projectDetailsBoxRight}>

                        
                        <div className={styles.projectTagsDiv}>

                            <div className={styles.upVoteCountTag} onClick={() => filterClickBoxId(_id)}>
                                <MdKeyboardArrowUp size={22} onClick={(e) => handelVoteCount(e, _id)} />
                                <p >{!vote ? 0 : vote}</p>
                            </div>

                            <div className={styles.commentCountTag}>
                                <p>{comments.length}</p>
                                <BsChatRightFill size={18} />
                            </div>

                        </div>

                    </div>

                </div>

                {/* Comments Toggle*/}
                {isActive && <Comment productId={_id} comments={comments} getProducts={getProducts} />}

            </div>

        </>
    )
}

export default Product;