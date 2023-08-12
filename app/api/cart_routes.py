from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models.user import User
from app.models.product import Product
from app.models.cartItem import CartItem
from app.models.db import db
from app.forms import UpdateCartItem
from sqlalchemy import insert
from pprint import pprint


cart_routes = Blueprint("cart_items", __name__)

# url_prefix='/api/carts'


#GET all cart items, pending purchase -checked on postman
@cart_routes.route("/", methods=["GET"])
@login_required
def get_current_cart():
    curr_user_id = current_user.to_dict()["id"]
    user_cart_pending = CartItem.query.filter(CartItem.userId == curr_user_id, CartItem.purchased == False).all()
    return {"CurrentCart": [p.to_dict() for p in user_cart_pending]}


#GET all cart items, purchase history -checked on postman
@cart_routes.route("/history", methods=["GET"])
@login_required
def get_past_cart():
    curr_user_id = current_user.to_dict()["id"]
    user_cart_purchased = CartItem.query.filter(CartItem.userId == curr_user_id, CartItem.purchased == True).all()
    return {"PastCart": [p.to_dict() for p in user_cart_purchased]}

#POST will be located within product_routes

#UPDATE item from PENDING CART -checked on postman, REMINDER: value is nullable, default false (not purchased), can leave blank and it will register as false
@cart_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_current_cart_item(id):
    curr_user_id = current_user.to_dict()["id"]
    cart_item_to_update = CartItem.query.filter_by(userId=curr_user_id, id=id).first()

    if not cart_item_to_update:
        return {"message": "Product couldn't be found."}

    form = UpdateCartItem()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        cart_item_to_update.cart_quantity=form.data["cart_quantity"]
        cart_item_to_update.purchased=form.data["purchased"]

        # pprint('THIS IS NEW_PRODUCT', new_product)
        db.session.commit()
        return cart_item_to_update.to_dict()
    else:
        return {"errors": form.errors}



#DELETE ITEMS FROM PENDING CART -checked on postman
@cart_routes.route("/<int:productId>", methods={"DELETE"})
@login_required
def delete_current_cart_item(productId):
    curr_user_id = current_user.to_dict()["id"]
    cart_item_to_delete = CartItem.query.filter_by(userId=curr_user_id, productId=productId).first()
    if not cart_item_to_delete:
        return {"message": "Product couldn't be found."}
    db.session.delete(cart_item_to_delete)
    db.session.commit()
    return{"message": "Product successfully removed from your cart!"}
