from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, User, Product
from app.forms import NewProduct, NewProductImage, NewArticle, NewWorkshop
from sqlalchemy import insert
from pprint import pprint

product_routes = Blueprint("products", __name__)

# prefix /products

#GET all Products
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
