import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
// import * as articleActions from "../../store/article"
import { thunkGetUsersArticles} from "../../store/article";
import EditArticle from "./EditArticle";
import "./Articles.css"


const UserArticles = () => {
    const dispatch = useDispatch();
    const userArticles = useSelector((state) => Object.values(state.article.userArticles))
    // console.log('WHAT AM I GETTING BACK HERE', allArticles)

    // const [isEditing, setIsEditing] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)


    useEffect(() => {
        dispatch(thunkGetUsersArticles());
    }, [dispatch])




    return(
        <>
        <div className="article-background">
            <div className="all-articles-container">
                <div className="article-edit-container-user">
                    <NavLink className="nav-link-articles" exact to={`/articles`}>
                        <div className="article-edit-container-present">
                            <button className="article-edit-button">Back to all articles</button>
                        </div>
                    </NavLink>
                    <NavLink to={`/articles/new`} className="create-new-article-link">
                        <a className="list-another-article">List another article to share!</a>
                    </NavLink>
                </div>
                <div className="arrangement-of-articles">
                    {userArticles.map((article) => (
                        <NavLink to={`/articles/${article.id}`} className="article-link" title={article.article_title}>
                            {/* {console.log('WHAT IS THIS', article.article_title)} */}
                            <EditArticle article={article}/>
                        </NavLink>
                    ))}
                </div>

            </div>
        </div>
        </>
    )
}


export default UserArticles;
