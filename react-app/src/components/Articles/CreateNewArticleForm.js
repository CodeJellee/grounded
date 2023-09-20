import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetSingleArticle, thunkUpdateSingleArticle} from "../../store/article"
import { useParams } from "react-router-dom";
import "./Articles.css"



const CreateNewArticleForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    let { articleId } = useParams();

    const oldArticleInfo = useSelector((state) => (state.article.singleArticle))
    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(thunkGetSingleArticle(articleId));
        // console.log('is this thunkgetsingleproduct working?')
    }, [dispatch])

    useEffect(() => {
        if (oldArticleInfo) {
            setArticleDescription(oldArticleInfo.article_description || "");
            setArticleLink(oldArticleInfo.article_link || "");
            setArticleTitle(oldArticleInfo.article_title || "");
        }
    }, [oldArticleInfo])

    // const [authorId, setAuthorId] = useState("");
    const [articleDescription, setArticleDescription] = useState("");
    const [articleLink, setArticleLink] = useState("")
    const [articleTitle, setArticleTitle] = useState("");

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false)


    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const errorsObject = {};

        // if (itemName === "") {
        //     errorsObject.itemName = "Item name is required.";
        // }


        if (Object.values(errorsObject).length > 0) return setErrors(errorsObject); // if there are any errors, stop here and return the errors


    let payload = {
        authorId: sessionUser.id,
        article_description: articleDescription,
        article_link: articleLink,
        article_title: articleTitle,

    };


    let fetchResponseFromThunk = await dispatch(thunkUpdateSingleArticle(articleId, payload, sessionUser));
    // console.log('what is the edit product fetchResponse', fetchResponseFromThunk)
    if (fetchResponseFromThunk) {
        await dispatch(
            thunkGetSingleArticle(
                fetchResponseFromThunk.id
            )
        );
        history.push(`/articles/${fetchResponseFromThunk.id}`)
    }

    history.push(`/articles/${fetchResponseFromThunk.id}`)



}

return (
    <>
    <div className="create-new-product-form-container">
        <div>
            <h2>Lets update your plant!</h2>
            <button className="create-new-product-form-submit-button" onClick={onSubmit}>Update Product</button>
        </div>
        <form className="create-new-product-form" type="submit">
            <div className="create-new-product-form-details">
                <label>
                    <div>{submitted && errors.itemName && <div className="errors">{errors.itemName}</div>}</div>
                    <input
                        type="text"
                        name="itemName"
                        className="all-input-boxes"
                        placeholder="Product Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </label>
                <label>
                    <div>{submitted && errors.productPrice && <div className="errors">{errors.productPrice}</div>}</div>
                    <input
                        type="text"
                        name="productPrice"
                        className="all-input-boxes"
                        placeholder="Price $USD"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                </label>
                <label>
                    <div>{submitted && errors.productQuantity && <div className="errors">{errors.productQuantity}</div>}</div>
                    <input
                        type="text"
                        name="productQuantity"
                        className="all-input-boxes"
                        placeholder="Quantity"
                        value={productQuantity}
                        onChange={(e) => setProductQuantity(e.target.value)}
                    />
                </label>
                <label>
                    <div>{submitted && errors.productDescription && <div className="errors">{errors.productDescription}</div>}</div>
                    <textarea
                        type="text"
                        name="productDescription"
                        className="all-input-boxes"
                        style={{ width: '350px', height: '150px' }}
                        placeholder="Tell us about your plant!"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                </label>
            </div>
        </form>
    </div>
</>
)

};

export default CreateNewArticleForm;
