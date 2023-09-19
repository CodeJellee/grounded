
function EditArticle({article}) {

    return (
        <div className="main-single-article-container">
            <div className="each-article-name">{article.article_title}</div>
            <div className="each-article-author">Shared by: {article.Author.first_name}</div>
            <div className="each-article-description">{article.article_description}</div>
            <div className="each-article-more">Click to read full description</div>
        </div>
    )
}


export default EditArticle;
