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
        <div className="main-single-product-container">
            <div>
                <div>
                    <img src={cartItem.Product.product_preview_image} alt={cartItem.Product.item_name}/>
                    <div>{cartItem.Product.item_name}</div>
                </div>
                <div>
                    <div>
                        {/* <NavLink exact to={`/products/${product.id}/edit`}>
                            <a className="edit-delete-links">Edit</a>
                        </NavLink> */}
                        <div>Qauntity</div>
                        <div className="each-product-price">${cartItem.Product.product_price}</div>
                        <a className="edit-delete-links" onClick={(() => setModalContent(<DeleteCartItemModal productId={cartItem.productId}/>))}>Remove</a>
                    </div>
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
