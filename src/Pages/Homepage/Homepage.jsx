import { useContext, useEffect, useState } from 'react';
import styles from './Homepage.module.css'
import Navbar from '../../components/Navbar/Navbar';
import loud from "../../assets/loud.svg"
import cred from "../../assets/cred.svg"
import { TbMessage2 } from "react-icons/tb";
import { BsChatRightFill } from "react-icons/bs";
import { MdKeyboardArrowUp } from "react-icons/md";
import Comment from '../../components/Comment/Comment';
import Modal from '../../components/Modal/Modal';
import Filter from '../../components/Filter/Filter';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import jwt_decode from "jwt-decode"
import apiClient from "../../components/apiClient/apiClient"

function Homepage() {

    const { loginModal, signupModal, setSignupModal, addProductModal, setAddProductModal, product, setProduct, user_token } = useContext(UserContext)


    const [clickedProductId, setClickedProductId] = useState(null);
    const [sortOption, setSortOption] = useState('vote')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sortedProducts, setSortedProducts] = useState([]);
    const [userComments, setUserComments] = useState({})
    const [clickedProductComments, setClickedProductComments] = useState([]);
    const [showComments, setShowComments] = useState(false); // Toggle state for comments

    const decodedToken = user_token ? jwt_decode(user_token) : null; //Token decode
    const userId = decodedToken ? decodedToken.id : null // Get User Id from Token

    const [editProduct, setEditProduct] = useState(null) // Product to edit



    // Fetch Products
    const getProducts = async () => {
        try {
            const response = await apiClient.get("/api/product/all")
            if (response.status === 200) {
                const data = await response.data
                if (response.status === 200) {
                    setProduct(data || []);
                }
            }
        } catch (error) {
            console.log('Error Getting products', error);
        }
    }

    // FIlter Clicked Box id
    const filterClickBoxId = (id) => {
        setClickedProductId(id);

        if (clickedProductId === id) {
            // If the same box is clicked again, hide the comments
            setClickedProductId(null);
            setShowComments(false);
        } else {
            setClickedProductId(id);
            const clickedProduct = product.find((pro) => pro._id === id)
            setClickedProductComments(clickedProduct ? clickedProduct.comments : []);
            setShowComments(true);
        }
    };

    // Handel vote count
    const handelVoteCount = async (e, id) => {
        e.stopPropagation();
        try {
            const clickedProduct = product.find((pro) => pro._id === id);
            if (!clickedProduct) {
                return console.log('clicked product not found');
            }

            const productId = clickedProduct._id;
            const updatedVoteCount = clickedProduct.vote + 1;

            const res = await apiClient.patch(`/api/product/${productId}`, {
                vote: updatedVoteCount
            });

            if (res.status === 200) {
                // Update the product's vote count locally
                setProduct((prevProducts) =>
                    prevProducts.map((product) => {
                        if (product._id === productId) {
                            return { ...product, vote: updatedVoteCount };
                        }
                        return product;
                    })
                );
            }
        } catch (error) {
            console.log('Error in increasing vote:', error);
        }
    }


    // set Filter state value(category)
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    // filter fun
    const filterProductByCategory = product.filter((pro) => {
        if (selectedCategory === '') {
            return true; // Return all products if no category is selected
        }
        return pro.category.includes(selectedCategory);
    });

    // calculate user comments function for (total) suggestion
    useEffect(() => {
        const calculateUserComments = () => {
            const commentsPerUser = {};
            product.forEach((pro) => {
                const userId = pro.user_id;

                if (pro.comments && Array.isArray(pro.comments)) {
                    const commentCount = pro.comments.length;
                    commentsPerUser[userId] = (commentsPerUser[userId] || 0) + commentCount;
                }
            });
            setUserComments(commentsPerUser);
        };
        calculateUserComments();
    }, [product])

    // Count number of comments - Total Suggestion
    const totalComments = Object.values(userComments).reduce((total, count) => total + count, 0);

    // open edit modal 
    const handelEditClick = (product) => {
        setEditProduct(product)
        setAddProductModal(true)
    }

    useEffect(() => {
        getProducts()
        //SOrt Based on Selected dropdown value
        const sortProducts = () => {
            let sortedProducts = [...product]; // Here copy of the products array

            if (sortOption === 'vote') {
                sortedProducts = sortedProducts.sort((a, b) => b.vote - a.vote);
            }
            else if (sortOption === 'comment') {
                sortedProducts = sortedProducts.sort((a, b) => b.comments.length - a.comments.length);
            }
            // Apply filter if a category is selected
            if (selectedCategory) {
                sortedProducts = sortedProducts.filter(
                    (pro) => pro.category.includes(selectedCategory)
                );
            }
            setSortedProducts(sortedProducts); // Update the sortedProducts state
        };
        sortProducts()
    }, [sortOption, selectedCategory, product])


    return (
        <div className={styles.bodyMain}>

            <div className={styles.bodyContainer}>

                <Navbar />

                {/* Poster Container */}
                <div className={styles.posterCotainer}>
                    <img src={loud} alt="poster" />
                    <div className={styles.heading}>
                        <h3>Add your products and give your valuable feedback</h3>
                        <p>Easily give your feedback in a matter of minutes. Access your audience on all platforms.
                            <br/>Observe result manually in real time</p>
                </div>
            </div>

            {/* DrownContainer */}
            <div className={styles.mainContainer}>

                {/* Filter Container */}
                <Filter handleCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} categories={product ? product.map((pro) => pro.category) : []} />

                {/* Project Container */}
                <div className={styles.projectsContainer}>

                    {/* Top Bar */}
                    <div className={styles.projectsTopBar}>

                        <div className={styles.projectsTopBarLeft}>
                            <h5>{totalComments} Suggestions</h5>

                            <div className={styles.sortDiv}>

                                <p>Sort by:</p>
                                <select name="vote" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                                    <option value="vote" >Upvotes</option>
                                    <option value="comment">Comments</option>
                                </select>

                            </div>

                        </div>

                        {/* Add Product Button */}
                        <div className={styles.projectsTopBarRight}>
                            {user_token ?
                                <button onClick={() => setAddProductModal(true)}>+ Add Product</button> :
                                <button onClick={() => setSignupModal(true)}>+ Add Product</button>
                            }
                        </div>

                    </div>

                    {/* Product Boxs Container */}
                    <div className={styles.productsBoxContainer} >

                        {(product !== undefined) ?
                            //Sort
                            sortedProducts.map((pro) => {
                                const { _id, user_id, title, description, category, comments, vote } = pro
                                const isActive = _id === clickedProductId

                                return (
                                    <div className={styles.projectsBox} key={_id} >

                                        <div className={styles.projectBoxUp}>

                                            {/* Box Left */}
                                            <div className={styles.projectDetailsBoxLeft}>

                                                <div className={styles.projectLogo}>
                                                    <img src={cred} alt="cred-logo" id={styles.projectLogo} />
                                                </div>

                                                <div className={styles.jobDetailsInfo}>

                                                    {/* Job Detail Layer 1 */}
                                                    <h5>{title}</h5>

                                                    {/* Job Detail Layer 2 */}
                                                    <div className={styles.jobDetails}>
                                                        <p>{description}</p>
                                                    </div>

                                                    {/* Job Detail Layer 3 */}
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
                                                            <p >Comments</p>
                                                            {/* <p onClick={() => filterClickBoxId(_id)}>Comments</p> */}
                                                        </div>

                                                        {/* Edit Button */}
                                                        {user_token && user_id === userId &&
                                                            (<div className={styles.projectEditButtonDiv}>

                                                                <button onClick={() => handelEditClick(pro)}>Edit</button>

                                                            </div>)}

                                                    </div>

                                                </div>

                                            </div>

                                            {/* Box Right */}
                                            <div className={styles.projectDetailsBoxRight}>

                                                {/* Edit Button */}
                                                {/* {user_token && user_id === userId &&
                                                        (<div className={styles.projectEditButtonDiv}>

                                                            <button onClick={() => handelEditClick(pro)}>Edit</button>

                                                        </div>)} */}

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
                                        {isActive && <Comment productId={_id} comments={comments} />}

                                    </div>)
                            }) : "Loading"
                        }

                    </div>

                </div >

            </div >

        </div >

            {/* Modal Show If True */ }
    { loginModal && <Modal type='login' /> }
    { signupModal && <Modal type='signup' /> }
    { addProductModal && (<Modal type='add-Product' />) }
        </div >

    )
}
export default Homepage;