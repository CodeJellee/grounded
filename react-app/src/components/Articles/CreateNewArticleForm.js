import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetSingleArticle, thunkCreateNewArticle} from "../../store/article"
import "./Articles.css"



const CreateNewArticleForm = () => {
    const sessionUser = useSelector((state) => state.session.user)

    const dispatch = useDispatch()
    const history = useHistory()


    // useEffect(() => {
    //     dispatch(thunkGetSingleArticle(articleId));
    //     // console.log('is this thunkgetsingleproduct working?')
    // }, [dispatch])


    // const [authorId, setAuthorId] = useState("");
    const [articleDescription, setArticleDescription] = useState("");
    const [articleLink, setArticleLink] = useState("")
    const [articleTitle, setArticleTitle] = useState("");

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false)


    function isValidURL(url) {
        // Regular expression pattern for a URL
        const urlPattern = /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/[\w.-]*)*\/?(\?[\w%=&-]*)?(#[\w-]*)?$/i;
        return urlPattern.test(url);
    }

    const isValid = isValidURL(articleLink);

    //   if (isValid) {
    //     console.log("The URL is valid.");
    //   } else {
    //     console.log("The URL is not valid.");
    //   }


    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const errorsObject = {};

        if (articleTitle === "") {
            errorsObject.articleTitle = "Article title is required.";
        }

        if (articleTitle.length < 5) {
            errorsObject.articleTitle = "Min. 5 characters required.";
        }

        if (articleTitle.length > 125) {
            errorsObject.articleTitle = "Less than 125 characters required.";
        }

        if (articleDescription === "") {
            errorsObject.articleDescription = "Article description is required.";
        }

        if (articleDescription.length < 10) {
            errorsObject.articleDescription = "Needs to be more than 10 characters."
        }

        if (articleDescription.length > 1000) {
            errorsObject.articleDescription = "Needs to be less than 1000 characters."
        }

        if (articleLink === "") {
            errorsObject.articleLink = "Article link is required.";
        }

        if (articleLink && !isValid) {
            errorsObject.articleLink = "The URL is not valid, please try a different article.";
        }


        if (Object.values(errorsObject).length > 0) return setErrors(errorsObject); // if there are any errors, stop here and return the errors


    let payload = {
        authorId: sessionUser.id,
        article_description: articleDescription,
        article_link: articleLink,
        article_title: articleTitle,

    };


    let fetchResponseFromThunk = await dispatch(thunkCreateNewArticle(payload, sessionUser));
    // console.log('what is the edit product fetchResponse', fetchResponseFromThunk)
    if (fetchResponseFromThunk) {
        await dispatch(
            thunkGetSingleArticle(
                fetchResponseFromThunk.id
            )
        );
        history.push(`/articles/${fetchResponseFromThunk.id}`)
    }
}

return (
    <>
        <div className="create-new-article-form-container">
            <div>
                <h2>Add a new article to share!</h2>
                <button className="create-new-article-form-submit-button" onClick={onSubmit}>Add Article</button>
            </div>
            <form className="create-new-article-form" type="submit">
                <div className="create-new-article-form-details">
                    <label>
                        <div>{submitted && errors.articleTitle && <div className="article-errors">{errors.articleTitle}</div>}</div>
                        <textarea
                            type="text"
                            name="articleTitle"
                            className="article-all-input-boxes-text"
                            placeholder="Article Title"
                            style={{ width: '350px', height: '75px' }}
                            value={articleTitle}
                            onChange={(e) => setArticleTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        <div>{submitted && errors.articleDescription && <div className="article-errors">{errors.articleDescription}</div>}</div>
                        <textarea
                            type="text"
                            name="articleDescription"
                            className="article-all-input-boxes-text"
                            style={{ width: '350px', height: '250px' }}
                            placeholder="Article Description"
                            value={articleDescription}
                            onChange={(e) => setArticleDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        <div>{submitted && errors.articleLink && <div className="article-errors">{errors.articleLink}</div>}</div>
                        <input
                            type="text"
                            name="articleLink"
                            className="article-all-input-boxes"
                            placeholder="Article Link"
                            value={articleLink}
                            onChange={(e) => setArticleLink(e.target.value)}
                        />
                    </label>
                </div>
            </form>
        </div>
    </>
)

};

export default CreateNewArticleForm;
