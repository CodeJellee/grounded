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


#UPDATE product by user - checked on postman
@product_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_product(id):
    product = Product.query.get(id)
    if not product:
        return {"message": "Product couldn't be found."}

    form = NewProduct()

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
