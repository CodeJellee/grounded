from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, User, Product, ProductImage, CartItem
from app.forms import NewProduct, NewProductImage, NewArticle, NewWorkshop
from sqlalchemy import insert
from pprint import pprint

product_routes = Blueprint("products", __name__)

# prefix /products

#GET all Products -checked on postman
@product_routes.route("/")
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
@product_routes.route("/<int:id>")
def product_info(id):
    product = Product.query.get(id)
    if not product:
        return {"message": "Product couldn't be found."}
    product = product.to_dict()
    sellerId = product["sellerId"]
    seller = User.query.get(sellerId).to_dict()
    product_images = ProductImage.query.filter(ProductImage.productId == id)
    product_images = [each.to_dict() for each in product_images]
    product["Seller"] = seller
    product["ProductImages"] = product_images
    return product


#GET Products sold by user -checked on postman
@product_routes.route("/current")
@login_required
def current_user_products():
    # pprint('THIS IS CURRENT_USER', current_user)
    curr_user_id = current_user.to_dict()["id"]
    # pprint('THIS IS CURRENT_USER_ID', curr_user_id)
    user_products = Product.query.filter(Product.sellerId == curr_user_id).all()
    return {"Products": [p.to_dict() for p in user_products]}
