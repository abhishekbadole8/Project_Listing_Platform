import { useContext, useState } from 'react'
import styles from './Comment.module.css'
import { UserContext } from '../../UserContext'
import button from "../../assets/button.svg"
import axios from 'axios'
import apiClient from "../apiClient/apiClient"

function Comment({ productId, comments }) {

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

        try {
            const response = await apiClient.patch(
                `/api/product/${productId}`,
                {
                    comments: [...comments, inputProductValue[productId]?.comments]
                }
            );
            if (response.status === 200) {
                const data = await response.data;
                console.log(data);
            }
        } catch (error) {
            console.log('Error In Add Product ', error);
        }
    }

    // const fetchComments
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
                                <a href="#"></a>
                                <p>{com}</p>
                            </li>
                        )
                    })
                    }
                </ul>

            </div>
        </>
    )
}
export default Comment;