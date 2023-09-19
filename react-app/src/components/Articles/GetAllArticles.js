import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
// import * as articleActions from "../../store/article"
import { thunkGetAllArticles} from "../../store/article";
import EachArticle from "./EachArticle";
import "./Articles.css"


const GetAllArticles = () => {
    const dispatch = useDispatch();
    const allArticles = useSelector((state) => Object.values(state.article.articles))
    // console.log('WHAT AM I GETTING BACK HERE', allArticles)

    // const [isEditing, setIsEditing] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)


    useEffect(() => {
        dispatch(thunkGetAllArticles());
    }, [dispatch])


    // const featureComingSoonClick = () => {
    //     alert("Feature coming soon!");
    // };

    // Function to toggle editing state
    // const toggleEditing = () => {
    //     setIsEditing(!isEditing);
    // };


    return(
        <>
        <div className="article-background">
            <div className="all-articles-container">
                <div className="article-edit-container">
                    {sessionUser?.id ? (
                            <div className="article-edit-container">
                                <button>Edit Articles</button>
                            </div>
                    ) : (
                        <>
                        </>
                    )}

                </div>
                <div className="arrangement-of-articles">
                    {allArticles.map((article) => (
                        <NavLink to={`/articles/${article.id}`} className="article-link" title={article.article_title}>
                            {/* {console.log('WHAT IS THIS', article.article_title)} */}
                            <EachArticle article={article}/>
                        </NavLink>
                    ))}
                </div>

            </div>
        </div>
        </>
    )
}


export default GetAllArticles;
