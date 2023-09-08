from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, CartItem, Workshop, Article
# from app.forms import NewProduct, NewProductImage, NewArticle, NewWorkshop
from sqlalchemy import insert


article_routes = Blueprint("articles", __name__)

# prefix /articles

#GET all articles
@article_routes.route("/", methods=["GET"])
def get_articles():
    dictionaryDataResponse = {}
    articles = Article.query.all()
    articles = [a.to_dict() for a in articles]
    dictionaryDataResponse["Articles"] = articles

    for article in articles:
        author = User.query.get(article["authorId"])
        author = author.to_dict()
        article["Author"] = author

    return dictionaryDataResponse
