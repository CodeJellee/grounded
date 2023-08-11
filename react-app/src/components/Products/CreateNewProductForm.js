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
    const [productDimension1, setProductDimension1] = useState("");
    const [productDimension2, setProductDimension2] = useState("");
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

        if (itemName.length < 5) {
            errorsObject.itemName = "Min. 5 characters required.";
        }

        if (itemName.length > 50) {
            errorsObject.itemName = "Less than 50 characters required.";
        }

        if (productPrice === "") {
            errorsObject.productPrice = "Price is required.";
        }

        if (productPrice === 0 || productPrice < 0) {
            errorsObject.productPrice = "Price needs to be at least 1."
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

        if (productQuantity === 0 || productQuantity < 0) {
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

        if (productDimension1 === "") {
            errorsObject.productDimension1 = "Width is required."
        }

        if (productDimension2 === "") {
            errorsObject.productDimension2 = "Height is required."
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
            product_dimension: productDimension1 + ' ' + productDimension2,
            product_preview_image: productPreviewImage
        };


        let fetchResponseFromThunk = await dispatch(thunkCreateNewProduct(payload, sessionUser));
        console.log('what are we getting back after creating a product s/p dispatch', fetchResponseFromThunk)

        if (fetchResponseFromThunk) {
            await dispatch(
                thunkGetSingleProduct(
                    fetchResponseFromThunk.id
                )
            );
            history.push(`/products/${fetchResponseFromThunk.id}`)
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
                                style={{ width: '350px', height: '150px' }}
                                placeholder="Tell us about your plant!"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            />
                        </label>
                        {/* <label>
                            <div>{submitted && errors.productDimension1 && <div className="errors">{errors.productDimension1}</div>}</div>
                            <input
                                type="text"
                                name="productDimension1"
                                className="all-input-boxes"
                                placeholder="Plant Dimensions"
                                value={productDimension1}
                                onChange={(e) => setProductDimension1(e.target.value)}
                            />
                        </label> */}

                        <div className="create-new-product-product-dimension-container">
                            <label>
                            <div>{submitted && errors.productDimension1 && <div className="errors">{errors.productDimension1}</div>}</div>
                            <select
                                name="productDimension1"
                                className="all-input-boxes-drop-box"
                                placeholder="Height"
                                value={productDimension1}
                                onChange={(e) => setProductDimension1(e.target.value)}
                                >
                                <option value="">Select Width</option>
                                <option value="W: 5 - 6 cm">W: 5 - 6 cm</option>
                                <option value="W: 6 - 7 cm">W: 6 - 7 cm</option>
                                <option value="W: 7 - 8 cm">W: 7 - 8 cm</option>
                                <option value="W: 8 - 9 cm">W: 8 - 9 cm</option>
                                <option value="W: 9 - 10 cm">W: 9 - 10 cm</option>
                                <option value="W: 10 - 15 cm">W: 10 - 15 cm</option>
                                <option value="W: 15 - 20 cm">W: 15 - 20 cm</option>
                                <option value="W: 20 - 25 cm">W: 20 - 25 cm</option>
                                <option value="W: 25 - 30 cm">W: 25 - 30 cm</option>
                                <option value="W: 30 - 35 cm">W: 30 - 35 cm</option>
                                <option value="W: 35 - 40 cm">W: 35 - 40 cm</option>
                                <option value="W: 40 - 45 cm">W: 40 - 45 cm</option>
                                <option value="W: 45 - 50 cm">W: 45 - 50 cm</option>
                                <option value="W: 50 - 55 cm">W: 50 - 55 cm</option>
                                <option value="W: 55 - 60 cm">W: 55 - 60 cm</option>
                                <option value="W: 60 - 65 cm">W: 60 - 65 cm</option>
                                <option value="W: 65 - 70 cm">W: 65 - 70 cm</option>
                                <option value="W: 70 - 75 cm">W: 70 - 75 cm</option>
                                <option value="W: 75 - 80 cm">W: 75 - 80 cm</option>
                            </select>
                            </label>
                            <label>
                            <div>{submitted && errors.productDimension2 && <div className="errors">{errors.productDimension2}</div>}</div>
                            <select
                                name="productDimension2"
                                className="all-input-boxes-drop-box"
                                placeholder="Width"
                                value={productDimension2}
                                onChange={(e) => setProductDimension2(e.target.value)}
                                >
                                <option value="">Select Height</option>
                                <option value="H: 5 - 6 cm">H: 5 - 6 cm</option>
                                <option value="H: 6 - 7 cm">H: 6 - 7 cm</option>
                                <option value="H: 7 - 8 cm">H: 7 - 8 cm</option>
                                <option value="H: 8 - 9 cm">H: 8 - 9 cm</option>
                                <option value="H: 9 - 10 cm">H: 9 - 10 cm</option>
                                <option value="H: 10 - 15 cm">H: 10 - 15 cm</option>
                                <option value="H: 15 - 20 cm">H: 15 - 20 cm</option>
                                <option value="H: 20 - 25 cm">H: 20 - 25 cm</option>
                                <option value="H: 25 - 30 cm">H: 25 - 30 cm</option>
                                <option value="H: 30 - 35 cm">H: 30 - 35 cm</option>
                                <option value="H: 35 - 40 cm">H: 35 - 40 cm</option>
                                <option value="H: 40 - 45 cm">H: 40 - 45 cm</option>
                                <option value="H: 45 - 50 cm">H: 45 - 50 cm</option>
                                <option value="H: 50 - 55 cm">H: 50 - 55 cm</option>
                                <option value="H: 55 - 60 cm">H: 55 - 60 cm</option>
                                <option value="H: 60 - 65 cm">H: 60 - 65 cm</option>
                                <option value="H: 65 - 70 cm">H: 65 - 70 cm</option>
                                <option value="H: 70 - 75 cm">H: 70 - 75 cm</option>
                                <option value="H: 75 - 80 cm">H: 75 - 80 cm</option>
                            </select>
                            </label>
                        </div>
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
