import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
// import * as articleActions from "../../store/article"
import { thunkGetSingleArticle} from "../../store/article";
// import EachArticle from "./EachArticle";
import "./Articles.css"


const EachArticleById = () => {
    let { articleId } = useParams()
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const article = useSelector((state) => (state.article.singleArticle))
    // const article = useSelector((state) => Object.values(state.article.singleArticle))

    console.log('WHAT IS ARTICLE', article)
    const history = useHistory()


    useEffect(async() => {
        await dispatch(thunkGetSingleArticle(articleId));
    }, [dispatch])


    // const featureComingSoonClick = () => {
    //     alert("Feature coming soon!");
    // };

    // Function to toggle editing state
    // const toggleEditing = () => {
    //     setIsEditing(!isEditing);
    // };


    return (
        <>
          {article && article.Author ? (
            <div className="each-article-by-id-background">
              <div className="each-article-by-id-return-to-all-article-button">
                <div className="article-edit-container-user">
                  <NavLink className="nav-link-articles" exact to={`/articles`}>
                    <div className="article-edit-container-present">
                      <button className="article-edit-button">Back to all articles</button>
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="main-single-article-id-container">
                <div className="each-article-name">{article.article_title}</div>
                <div className="each-article-author">Shared by: {article.Author.first_name}</div>
                <div className="each-article-id-description">{article.article_description}</div>
                <div className="each-article-id-more" onClick={() => window.open(article.article_link, '_blank')}>Sound interesting? Click here for the original article</div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      );
}


export default EachArticleById;
