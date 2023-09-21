//TYPE----------------------------------------------------------------------------------------------//
const GET_ALL_ARTICLES = "articles/GET_ALL_ARTICLES"
const GET_EACH_ARTICLE = "articles/GET_EACH_ARTICLE"
const GET_USERS_ARTICLES ="articles/GET_USERS_ARTICLES"
const CREATE_NEW_ARTICLE = "articles/CREATE_NEW_ARTICLE"
const UPDATE_EACH_ARTICLE = "articles/UPDATE_EACH_ARTICLE"
const DELETE_EACH_ARTICLE = "articles/DELETE_EACH_ARTICLE"

//ACTION----------------------------------------------------------------------------------------------//

const actionGetAllArticles = (articles) => ({
    type: GET_ALL_ARTICLES,
    articles,
})

const actionGetSingleArticle = (article) => ({
    type: GET_EACH_ARTICLE,
    article,
})

const actionGetUsersArticles = (articles) => ({
    type: GET_USERS_ARTICLES,
    articles,
})

const actionCreateNewArticle = (article, currentUser) => ({
    type: CREATE_NEW_ARTICLE,
    article,
    currentUser,
})

const actionUpdateSingleArticle = (articleId, article, currentUser) => ({
    type: UPDATE_EACH_ARTICLE,
    articleId,
    article,
    currentUser,
})

const actionDeleteSingleArticle = (article, data) => ({
    type: DELETE_EACH_ARTICLE,
    article,
    data,
})


//THUNKS----------------------------------------------------------------------------------------------//

export const thunkGetAllArticles = () => async (dispatch) => {
    const response = await fetch("/api/articles", {
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(actionGetAllArticles(data))
        return data;
    }

    return "error";
}

export const thunkGetSingleArticle = (articleId) => async (dispatch) => {
    const response = await fetch(`/api/articles/${articleId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(actionGetSingleArticle(data))
        return data;
    }

    return "Article couldn't be found.";
}

export const thunkGetUsersArticles = () => async (dispatch) => {
    try {
        let response = await fetch(`/api/articles/current`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const userArticles = await response.json()
            dispatch(actionGetUsersArticles(userArticles))
        } else {
            throw new Error("Failed to fetch user articles")
        }
    } catch (e) {
        return { error: e.message }
    }
}

export const thunkCreateNewArticle = (article, currentUser) => async (dispatch) => {
    try {

        // console.log("thunkCreateNew Body:", JSON.stringify(product))

        let response = await fetch (`/api/articles/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(article),
        });

        if (response.ok){
            const data = await response.json();
            dispatch(actionCreateNewArticle(data, currentUser));
            return data
        } else {
            const errorResponse = await response.json();
            return errorResponse
        }

    } catch (e) {
        return { error: e.message };
    }
}

export const thunkUpdateSingleArticle = (articleId, updatedArticle, currentUser) => async(dispatch) => {

    try{
        let response = await fetch(`/api/articles/${articleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedArticle),
        });

        if (response.ok){
            const data = await response.json();
            dispatch(actionUpdateSingleArticle(articleId, data, currentUser))
            return data
        } else {
            const errorResponse = await response.json();
            return errorResponse
        }

    } catch (e) {
        return { error: e.message}
    }
}

export const thunkDeleteSingleArticle = (articleId) => async (dispatch) => {
    let response = await fetch(`/api/articles/${articleId}`, {
        method: "DELETE"
    });

    if (response.ok){
        const data = await response.json();
        dispatch(actionDeleteSingleArticle(articleId, data));
        return data
    }

    return "Article does not exist"
}

//REDUCER----------------------------------------------------------------------------------------------//

let initialState = {
    articles: {},
    singleArticle: {},
    userArticles: {},
};


export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type){
        case GET_ALL_ARTICLES:{
            newState = { ...state };
            action.articles.Articles.forEach(
                //NOTE: STATE IS BEING FLATTENED BELOW, id to match the product.id
                (article) => (newState.articles[article.id] = article)
            );
            return newState;
        }
        case GET_EACH_ARTICLE:{
            newState = { ...state };
            const article = action.article;
            newState.singleArticle = { ...article };
            return newState;
        }
        case GET_USERS_ARTICLES:{
            newState = { ...state };

            newState.userArticles = {};
            action.articles.Articles.forEach(
                (article) => (newState.userArticles[article.id] = article)
            );
            return newState;
        }
        case CREATE_NEW_ARTICLE:{
            newState = { ...state };
            newState.singleArticle = {};
            const article = action.article;

            newState.singleArticle = article;

            newState.articles[article.id] = {
                Author: action.currentUser,
                ...action.article,
            }
            return newState
        }
        case UPDATE_EACH_ARTICLE:{

            newState = { ...state }
            newState.singleArticle = {}
            newState.articles = { ...newState.articles }
            newState.userArticles= { ...newState.userArticles }

            newState.singleArticle = action.article
            newState.articles[action.articleId] = {
                Author: action.currentUser,
                ...action.article,
            }
            newState.userArticles[action.articleId] = action.article
            return newState

        }
        case DELETE_EACH_ARTICLE:{
            newState = { ...state };
            newState.articles = { ...newState.articles };
            newState.userArticles = { ...newState.userArticles };
            newState.singleArticle = {};

            delete newState.articles[action.article]
            delete newState.userArticles[action.article]

            return newState
        }
        default:
            return state;
    }
}
