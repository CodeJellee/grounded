from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, CartItem, Workshop, Article
# from app.forms import NewProduct, NewProductImage, NewArticle, NewWorkshop
from sqlalchemy import insert


article_routes = Blueprint("articles", __name__)

# prefix /articles

#GET all articles-checked on postman
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


#GET Single article-checked on postman
@article_routes.route("/<int:id>", methods=["GET"])
def article_info(id):
    article = Article.query.get(id)

    if not article:
        return {"message": "Article couldn't be found."}

    article = article.to_dict()
    author = User.query.get(article["authorId"])
    author = author.to_dict()
    article["Author"] = author

    return article


#GET Articles by user -checked on postman
@article_routes.route("/current", methods=["GET"])
@login_required
def current_user_articles():
    curr_user_id = current_user.to_dict()["id"]
    user_articles = Article.query.filter(Article.authorId == curr_user_id).all()

    if not user_articles:
        return {"message": "No articles found for the current user."}, 404

    return {"Articles": [a.to_dict() for a in user_articles]}


#DELETE article by user-checked on postman
@article_routes.route("/<int:id>", methods = ["DELETE"])
@login_required
def delete_article(id):
    article_to_delete = Article.query.get(id)
    if not article_to_delete:
        return {"message": "Article couldn't be found."}
    db.session.delete(article_to_delete)
    db.session.commit()
    return {"message": "Article successfully deleted!"}
