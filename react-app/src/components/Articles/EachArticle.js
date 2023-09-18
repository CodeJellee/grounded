

function EachArticle({article}) {

    return (
        <div className="main-single-article-container">
            <div className="each-article-container">
                <div>
                    {/* <div className="each-product-image">
                        <img className="each-product-preview-image" src={product.product_preview_image} alt={product.item_name}/>
                    </div> */}
                    <div className="each-article-name-container">
                        <div className="each-article-name">{article.article_title}</div>
                        {/* <div className="each-product-price">${product.product_price}</div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default EachArticle;
