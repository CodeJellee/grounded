from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Product, ProductImage, CartItem
from app.forms import NewProduct, NewProductImage, NewArticle, NewWorkshop
from sqlalchemy import insert
from pprint import pprint


product_routes = Blueprint("products", __name__)

# prefix /products

#GET all Products -checked on postman
@product_routes.route("/", methods=["GET"])
def get_products():
    dictionaryDataResponse = {}
    products = Product.query.all()
    products = [p.to_dict() for p in products]
    dictionaryDataResponse["Products"] = products

    for product in products:
        seller = User.query.get(product["sellerId"])
        seller = seller.to_dict()
        product["Seller"] = seller

    return dictionaryDataResponse


#GET Single Product- checked on postman
@product_routes.route("/<int:id>", methods=["GET"])
def product_info(id):
    print('this is coming from the route', id)
    product = Product.query.get(id)

    if not product:
        return {"message": "Product couldn't be found."}

    product = product.to_dict()
    sellerId = product["sellerId"]
    seller = User.query.get(sellerId).to_dict()
    product_images = ProductImage.query.filter(ProductImage.productId == id).first()
    # product_images = [each.to_dict() for each in product_images] --> if planning to do more than 1 photo, keep this and change .first() to .all()
    product_images = product_images.to_dict() if product_images else None
    product["Seller"] = seller
    product["ProductImages"] = product_images
    return product


#GET Products sold by user -checked on postman
@product_routes.route("/current", methods=["GET"])
@login_required
def current_user_products():
    # pprint('THIS IS CURRENT_USER', current_user)
    curr_user_id = current_user.to_dict()["id"]
    # pprint('THIS IS CURRENT_USER_ID', curr_user_id)
    user_products = Product.query.filter(Product.sellerId == curr_user_id).all()
    return {"Products": [p.to_dict() for p in user_products]}

#POST new product by user - checked on postman
@product_routes.route("/new", methods=["POST"])
@login_required
def create_new_product():
    form = NewProduct()

    #need to get CSRF_TOKEN for flask-wtf/wtforms to work on production
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_product = Product(
            sellerId=current_user.to_dict()["id"],
            item_name=form.data["item_name"],
            product_price=form.data["product_price"],
            product_quantity=form.data["product_quantity"],
            product_description=form.data["product_description"],
            product_dimension=form.data["product_dimension"],
            product_preview_image=form.data["product_preview_image"],
        )
        # pprint('THIS IS NEW_PRODUCT', new_product)
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    else:
        return {"errors": form.errors}

#UPDATE product by user - checked on postman
@product_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_product(id):

    product = Product.query.get(id)
    if not product:
        return {"message": "Product couldn't be found."}

    # Check if the product's seller ID matches the current user's ID
    # if product.sellerId != current_user.id:
    #     return {"message": "You are not authorized to update this product."}

    form = NewProduct()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        product.id=id
        product.sellerId=current_user.to_dict()["id"]
        product.item_name=form.data["item_name"]
        product.product_price=form.data["product_price"]
        product.product_quantity=form.data["product_quantity"]
        product.product_description=form.data["product_description"]
        product.product_dimension=form.data["product_dimension"]
        product.product_preview_image=form.data["product_preview_image"]
        # pprint('THIS IS NEW_PRODUCT', new_product)
        db.session.commit()
        return product.to_dict()
    else:
        return {"errors": form.errors}


#DELETE product by user -checked on postman
@product_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_product(id):
    product_to_delete = Product.query.get(id)
    if not product_to_delete:
        return{"message": "Product couldn't be found."}
    db.session.delete(product_to_delete)
    db.session.commit()
    return{"message": "Product successfully deleted!"}

#POST new extra product image by productId by user - checked on postman
@product_routes.route("/<int:id>/images", methods=["POST"])
@login_required
def add_images(id):
    form = NewProductImage()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        product = Product.query.get(id)

        new_image = ProductImage(
            productId=product.id,
            product_image=form.data["product_image"],
        )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    else:
        return {"errors": form.errors}


#UPDATE extra product image by productId by user - checked on postman
@product_routes.route("/<int:id>/images", methods=["PUT"])
@login_required
def update_images(id):
    productImg = ProductImage.query.get(id)
    if not productImg:
        return {"message": "Product couldn't be found."}

    form = NewProductImage()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        product = Product.query.get(id)

        new_image = ProductImage(
            productId=product.id,
            product_image=form.data["product_image"],
        )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    else:
        return {"errors": form.errors}

#DELETE extra product image by productId by user- checked on postman
@product_routes.route("/<int:id>/images", methods=["DELETE"])
@login_required
def delete_image(id):
    image_to_delete = ProductImage.query.get(id)
    if not image_to_delete:
        return{"message": "Product couldn't be found."}
    db.session.delete(image_to_delete)
    db.session.commit()
    return{"message": "Product successfully deleted!"}

#CART ROUTE BELOW
#POST add item to cart - checked on postman
@product_routes.route("/<int:id>/to_cart", methods=["POST"])
@login_required
def post_to_cart(id):
    curr_user_id = current_user.to_dict()["id"]
    product_id_exists = Product.query.get(id)

    if not product_id_exists:
        return {"message": "Product couldn't be found."}

    already_in_cart = (
        db.session.query(CartItem)
        .filter((CartItem.userId == curr_user_id) & (CartItem.productId == id))
        .first()
    )

    if already_in_cart:
        return {"message": "Product in cart already!"}

    if product_id_exists and curr_user_id == product_id_exists.sellerId:
        return {"message": "You may not add your own product to cart."}

    if product_id_exists and product_id_exists.sellerId != curr_user_id:
        add_to_cart = CartItem(userId=curr_user_id, productId=id, cart_quantity=1)
        db.session.add(add_to_cart)
        db.session.commit()
        # new_state_update = {
        #     "CurrentCart": add_to_cart.to_dict(),
        #     "Product": product_id_exists.to_dict(),

        # }

        #decided to just explicitly write out how I want the return to look like
        new_state_update = {
            "CurrentCart": [
                {
                    "cart_quantity": add_to_cart.cart_quantity,
                    "createdAt": add_to_cart.createdAt,
                    "id": add_to_cart.id,
                    "productId": add_to_cart.productId,
                    "purchased": add_to_cart.purchased,
                    "updatedAt": add_to_cart.updatedAt,
                    "userId": add_to_cart.userId,
                    "workshopId": add_to_cart.workshopId,
                    "Product": {
                        "createdAt": product_id_exists.createdAt,
                        "id": product_id_exists.id,
                        "item_name": product_id_exists.item_name,
                        "product_description": product_id_exists.product_description,
                        "product_dimension": product_id_exists.product_dimension,
                        "product_preview_image": product_id_exists.product_preview_image,
                        "product_price": product_id_exists.product_price,
                        "product_quantity": product_id_exists.product_quantity,
                        "sellerId": product_id_exists.sellerId,
                        "updatedAt": product_id_exists.updatedAt,
                    },
                }
            ]
        }

        return new_state_update
    else:
        return {"message": "Product couldn't be added to cart."}
