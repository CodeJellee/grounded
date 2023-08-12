import { useModal } from "../../context/Modal"
import DeleteProductModal from "./DeleteProductModal";
import { NavLink } from "react-router-dom";


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
                            <NavLink exact to={`/products/${product.id}/edit`}>
                                <a className="edit-delete-links">Edit</a>
                            </NavLink>
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
