import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
// import * as articleActions from "../../store/article"
import { thunkGetAllArticles} from "../../store/article";
import EachArticle from "./EachArticle";
// import "./Products.css"


const GetAllArticles = () => {
    const dispatch = useDispatch();
    const allArticles = useSelector((state) => Object.values(state.article.articles))
    // console.log('WHAT AM I GETTING BACK HERE', allArticles)

    useEffect(() => {
        dispatch(thunkGetAllArticles());
    }, [dispatch])


    // const featureComingSoonClick = () => {
    //     alert("Feature coming soon!");
    // };


    return(
        <>
            <div className="all-articles-container">
                {/* <a className="filter-link" onClick={featureComingSoonClick}>+ Filter</a> */}
                <div className="arrangement-of-articles">
                    {allArticles.map((article) => (
                        <NavLink to={`/articles/${article.id}`} className="article-link" title={article.article_title}>
                            {console.log('WHAT IS THIS', article.article_title)}
                            <EachArticle article={article}/>
                        </NavLink>
                    ))}
                </div>

            </div>
        </>
    )
}


export default GetAllArticles;
