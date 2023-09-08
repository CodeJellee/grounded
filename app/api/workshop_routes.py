from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Product, ProductImage, CartItem, Workshop
from app.forms import NewProduct, NewProductImage, NewArticle, NewWorkshop
from sqlalchemy import insert


workshop_routes = Blueprint("workshops", __name__)

# prefix /workshops
