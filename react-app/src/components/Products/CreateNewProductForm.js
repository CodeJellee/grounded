import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreateNewProduct, thunkGetSingleProduct} from "../../store/product"
import "./Products.css"


const CreateNewProductForm = () => {
    // let { productId } = useParams()
    const sessionUser = useSelector((state) => state.session.user)
    // const productState = useSelector((state) => (state.products.singleProduct))

    const dispatch = useDispatch();
    const history = useHistory()


    const [sellerId, setSellerId] = useState("");
    const [itemName, setItemName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productDimension, setProductDimension] = useState("");
    const [productPreviewImage, setProductPreviewImage] = useState("");

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const errorsObject = {};

        if (itemName === "") {
            errorsObject.itemName = "Item name is required.";
        }

        if (productPrice === "") {
            errorsObject.productPrice = "Price is required.";
        }

        if (productPrice.length > 6) {
            errorsObject.productPrice = "Price is unreasonable or too large.";
        }

        if (isNaN(Number(productPrice)) || isNaN(productPrice)) {
            errorsObject.productPrice = "Price needs to be a valid integer price.";
        }

        if (!productPrice.includes(".") || productPrice.split('.')[1].length !== 2) {
            errorsObject.productPrice = "Price needs to have 2 decimal places.";
        }

        if (productQuantity === "") {
            errorsObject.productQuantity = "Quantity is required.";
        }

        if (productQuantity === 0) {
            errorsObject.productQuantity = "Quantity needs to be at least 1."
        }

        if (productQuantity > 10) {
            errorsObject.productQuantity = "Quantity needs to be less than 10."
        }

        if (isNaN(Number(productQuantity)) || isNaN(productQuantity)) {
            errorsObject.productQuantity = "Quantity needs to be a valid integer price.";
        }

        if (productDescription === "") {
            errorsObject.productDescription = "Description is required."
        }

        if (productDescription.length < 10) {
            errorsObject.productDescription = "Needs to be more than 10 characters."
        }

        if (productDescription.length > 255) {
            errorsObject.productDescription = "Needs to be less than 255 characters."
        }

        if (productDimension === "") {
            errorsObject.productDimension = "Dimension is required."
        }

        if (productPreviewImage === "") {
            errorsObject.productPreviewImage = "Preview image is required."
        }

        if (productPreviewImage && !(productPreviewImage.endsWith(".png") || productPreviewImage.endsWith(".jpg") || productPreviewImage.endsWith(".jpeg"))) {
            errorsObject.productPreviewImage = "Preview image must end in .png, .jpg, or .jpeg.";
        }

        if (Object.values(errorsObject).length > 0) return setErrors(errorsObject); // if there are any errors, stop here and return the errors

        let payload = {
            sellerId: sessionUser.id,
            item_name: itemName,
            product_price: Number(productPrice),
            product_quantity: Number(productQuantity),
            product_description: productDescription,
            product_dimension: productDimension,
            product_preview_image: productPreviewImage
        };


        let fetchResponseFromThunk = await dispatch(thunkCreateNewProduct(payload, sessionUser));
        console.log('what are we getting back after creating a product s/p dispatch', fetchResponseFromThunk)

        if (fetchResponseFromThunk) {
            await dispatch(
                thunkGetSingleProduct(
                    fetchResponseFromThunk.product.id
                )
            );
            history.push(`/products/${fetchResponseFromThunk.product.id}`)
        }
    };

    return (
        <>
            <div className="create-new-product-form-container">
                <div>
                    <h2>What plant do you want to sell?</h2>
                    <button className="create-new-product-form-submit-button" onClick={onSubmit}>Create Product</button>
                </div>
                <form className="create-new-product-form" type="submit">
                    <div className="create-new-product-form-details">
                        <label>
                            <div>{submitted && errors.itemName && <div className="errors">{errors.itemName}</div>}</div>
                            <input
                                type="text"
                                name="itemName"
                                className="all-input-boxes"
                                placeholder="Product Name"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>{submitted && errors.productPrice && <div className="errors">{errors.productPrice}</div>}</div>
                            <input
                                type="text" //can try number....
                                name="productPrice"
                                className="all-input-boxes"
                                placeholder="Price $USD"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>{submitted && errors.productQuantity && <div className="errors">{errors.productQuantity}</div>}</div>
                            <input
                                type="text"//can try number....
                                name="productQuantity"
                                className="all-input-boxes"
                                placeholder="Quantity"
                                value={productQuantity}
                                onChange={(e) => setProductQuantity(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>{submitted && errors.productDescription && <div className="errors">{errors.productDescription}</div>}</div>
                            <textarea
                                type="text"
                                name="productDescription"
                                className="all-input-boxes"
                                style={{ width: '300px', height: '150px' }}
                                placeholder="Tell us about your plant!"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>{submitted && errors.productDimension && <div className="errors">{errors.productDimension}</div>}</div>
                            <input
                                type="text"
                                name="productDimension"
                                className="all-input-boxes"
                                placeholder="Plant Dimensions"
                                value={productDimension}
                                onChange={(e) => setProductDimension(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>{submitted && errors.productPreviewImage && <div className="errors">{errors.productPreviewImage}</div>}</div>
                            <input
                                type="text"
                                name="productPreviewImage"
                                className="all-input-boxes"
                                placeholder="Preview Image"
                                value={productPreviewImage}
                                onChange={(e) => setProductPreviewImage(e.target.value)}
                            />
                        </label>
                    </div>
                </form>
            </div>
        </>
    )

}

export default CreateNewProductForm;
