import { useModal } from "../../context/Modal"
import { useSelector } from "react-redux";
import DeleteCartItemModal from "../Cart/DeleteCartItemModal"
import "./Carts.css"

function EachCartItem({cartItem}) {
    const { setModalContent } = useModal()
    const allCartItems = useSelector((state) => Object.values(state.cart.currentCart));

    // const featureComingSoonClick = () => {
    //     alert("Feature coming soon!");
    // };


    return (
        <div className="each-cart-item-container">
            <div className="cart-photo-and-title">
                <img className="cart-product-image" src={cartItem.Product.product_preview_image} alt={cartItem.Product.item_name}/>
                <div className="cart-product-name">{cartItem.Product.item_name}</div>
            </div>
            <div className="cart-quantity-price-delete">
                <div className="cart-product-quantity">Quantity</div>
                <div className="cart-price-delete">
                    <div className="each-product-price">${cartItem.Product.product_price}</div>
                    <button className="cart-delete-button" onClick={(() => setModalContent(<DeleteCartItemModal productId={cartItem.productId}/>))}>✕</button>
                </div>
            </div>
        </div>
        // <>
        //     <div className="all-products-container">


        //     <h3 className="user-selling-blurb">Current Cart Items!</h3>
        //     <div className="user-selling-new-and-filter">
        //         {/* <NavLink to={`/products/new`} className="create-new-product-link">
        //             <a className="list-another-plant-to-sell">List another plant to sell!</a>
        //         </NavLink>
        //         <a className="filter-link" onClick={featureComingSoonClick}>+ Filter</a> */}
        //     </div>
        //     <div className="product-page-grid">
        //         {allUserProducts.map((product) => (
        //             <NavLink to={`/products/${product.id}`} className="product-link" title={product.name}>
        //                 <EachUserProduct product={product}/>
        //             </NavLink>
        //         ))}
        //     </div>

        //     </div>
        // </>
    )
}


export default EachCartItem;
