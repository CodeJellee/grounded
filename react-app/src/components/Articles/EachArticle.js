

function EachArticle({article}) {

    return (
        <div className="main-single-article-container">
            <div className="each-article-name">{article.article_title}</div>
            <div className="each-article-description">Brief Description: {article.article_description}</div>
            <div className="each-article-more">Click to read full article</div>
        </div>
    )
}


export default EachArticle;
