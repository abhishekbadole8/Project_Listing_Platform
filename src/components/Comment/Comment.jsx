import { useContext, useEffect } from 'react'
import styles from './Comment.module.css'
import { UserContext } from '../../UserContext'
import button from "../../assets/button.svg"
import apiClient from "../apiClient/apiClient"

function Comment({ productId, comments, getProducts }) {

    const { inputProductValue, setInputProductValue } = useContext(UserContext)

    const handelComments = (e) => {
        setInputProductValue((prevValue) => ({
            ...prevValue,
            [productId]: {
                ...prevValue[productId],
                comments: e.target.value
            }
        }));
    }

    const addComment = async () => {
        //Preventing empty comments
        if (!inputProductValue[productId]?.comments.trim()) {
            return;
        }

        try {
            const response = await apiClient.patch(
                `/api/product/${productId}`,
                {
                    comments: [...comments, inputProductValue[productId]?.comments]
                }
            );
            if (response.status === 200) {
                await response.data;
                setInputProductValue({})
            }
        } catch (error) {
            console.log('Error In Add Product ', error);
        }
    }

    useEffect(() => {
        getProducts()
    }, [inputProductValue])

    return (
        <>
            <div className={styles.projectBoxDown}>

                <div className={styles.commentInputDiv}>
                    <input type="text" value={inputProductValue[productId]?.comments || ""} placeholder='Add a comment....' onChange={handelComments} />
                    <img src={button} alt="submit-button-img" onClick={addComment} />
                </div>

                <ul className={styles.commentList}>

                    {comments.map((com, i) => {
                        return (
                            <li key={i}>
                                <a ></a>
                                <p>{com}</p>
                            </li>
                        )
                    })}
                </ul>

            </div>
        </>
    )
}
export default Comment;