

function EachProduct({product}) {

    return (
        <div className="main-single-product-container">
            <div className="each-product-container">
                <div>
                    <div className="each-product-image">
                        <img className="each-product-preview-image" src={product.product_preview_image} alt={product.item_name}/>
                    </div>
                    <div className="each-product-name-price">
                        <div className="each-product-name">{product.item_name}</div>
                        <div className="each-product-price">${product.product_price}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default EachProduct;
