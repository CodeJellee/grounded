import { useModal } from "../../context/Modal"
import DeleteProductModal from "./DeleteProductModal";


function EachUserProduct({product}) {
    const { setModalContent } = useModal()

    const featureComingSoonClick = () => {
        alert("Feature coming soon!");
    };


    return (
        <div className="main-single-product-container">
            <div className="each-product-container">
                <div>
                    <div className="each-product-image">
                        <img className="each-product-preview-image" src={product.product_preview_image} alt={product.item_name}/>
                    </div>
                    <div className="each-product-name-price">
                        <div className="each-product-name">{product.item_name}</div>
                        <div className="edit-delete-container">
                            <a className="edit-delete-links" onClick={featureComingSoonClick}>Edit</a>
                            <div className="each-product-price">${product.product_price}</div>
                            <a className="edit-delete-links" onClick={(() => setModalContent(<DeleteProductModal productId={product.id}/>))}>Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default EachUserProduct;
