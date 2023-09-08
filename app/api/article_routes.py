from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Product, ProductImage, CartItem, Workshop, Article
# from app.forms import NewProduct, NewProductImage, NewArticle, NewWorkshop
from sqlalchemy import insert


article_routes = Blueprint("articles", __name__)

# prefix /articles
