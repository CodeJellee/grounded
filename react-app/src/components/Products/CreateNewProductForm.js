import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreateNewProduct, thunkGetSingleProduct} from "../../store/product"
// import "./CreateNewProduct.css"


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
            errorsObject.productDescription = "Description needs to be more than 10 characters."
        }

        if (productDescription.length > 255) {
            errorsObject.productDescription = "Description needs to be less than 255 characters."
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
            <div>
                <h1>CREATE PRODUCT PAGE</h1>
            </div>
        </>
    )

}

export default CreateNewProductForm;
