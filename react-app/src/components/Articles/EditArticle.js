import { thunkDeleteSingleArticle } from "../../store/article";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import EditArticleForm from "./EditArticleForm";


function EditArticle({article}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteClick = async () => {
        await dispatch(thunkDeleteSingleArticle(article.id))
        history.push(`/articles/current`)
    }

    return (
        <div className="main-single-article-container">
            <div className="each-article-name">{article.article_title}</div>
            <div className="each-article-description">{article.article_description}</div>
            <div className="each-article-buttons">
                <NavLink exact to={`/articles/${article.id}/edit`}>
                    <button className="user-article-edit-delete-buttons">Edit</button>
                </NavLink>
                <button className="user-article-edit-delete-buttons" onClick={deleteClick}>Delete</button>
            </div>
        </div>
    )
}


export default EditArticle;
