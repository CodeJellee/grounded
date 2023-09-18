//TYPE----------------------------------------------------------------------------------------------//
const GET_ALL_ARTICLES = "articles/GET_ALL_ARTICLES"
const GET_EACH_ARTICLE = "articles/GET_EACH_ARTICLE"
// const GET_USERS_ARTICLES ="articles/GET_USERS_ARTICLES"
// const CREATE_NEW_ARTICLE = "articles/CREATE_NEW_ARTICLE"
// const UPDATE_EACH_ARTICLE = "articles/UPDATE_EACH_ARTICLE"
// const DELETE_EACH_ARTICLE = "articles/DELETE_EACH_ARTICLE"

//ACTION----------------------------------------------------------------------------------------------//

const actionGetAllArticles = (articles) => ({
    type: GET_ALL_ARTICLES,
    articles,
})

const actionGetSingleArticle = (article) => ({
    type: GET_EACH_ARTICLE,
    article,
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
        default:
            return state;
    }
}
