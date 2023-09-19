
function EditArticle({article}) {

    return (
        <div className="main-single-article-container">
            <div className="each-article-name">{article.article_title}</div>
            <div className="each-article-description">{article.article_description}</div>
            <div className="each-article-buttons">
                <button className="user-article-edit-delete-buttons">Edit</button>
                <button className="user-article-edit-delete-buttons">Delete</button>
            </div>
        </div>
    )
}


export default EditArticle;
