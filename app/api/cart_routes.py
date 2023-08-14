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


#GET all cart items, pending purchase -checked on postman, W/ UPDATE
@cart_routes.route("/", methods=["GET"])
@login_required
def get_current_cart():
    curr_user_id = current_user.to_dict()["id"]
    user_cart_pending = CartItem.query.filter(CartItem.userId == curr_user_id, CartItem.purchased == False).all()
    cart_item_list_of_dictionaries = [p.to_dict() for p in user_cart_pending]
    # print('THIS IS USER CART PENDING', testing)
    # print('AM I GRABBING THE PRODUCT INFO', testing.productId)

    cart_with_product_info = []

    for item in cart_item_list_of_dictionaries:
        product_id = item['productId']
        product_info = Product.query.filter(Product.id == product_id).first()
        if product_info:
            item_with_product_info = item.copy() #cart info
            item_with_product_info["Product"] = product_info.to_dict() #product info
            cart_with_product_info.append(item_with_product_info) #appending to create a list

    return {"CurrentCart": cart_with_product_info} #returning a CurrentCart object with a list of objects for each product with cart info and product info
        # print("ARE THESE PRINTING THE ID", product_id) #yes these print the proper productId
        # print('does this show all product info', product_info.to_dict())

    # print('what is product_info', product_info.to_dict())
    # print('this should be all items in current cart', item)

    # product_info = Product.query.filter(Product.id == product_id).all()
    # print('WHAT IS PRODUCT_INFO', product_info.to_dict())


    # product_info = Product.query.filter(Product.id == user_cart_pending.productId)
    # return {"CurrentCart": [p.to_dict() for p in user_cart_pending],
    #         "Product": "should be here"
    #         }


#GET all cart items, purchase history -checked on postman W/ UPDATE
@cart_routes.route("/history", methods=["GET"])
@login_required
def get_past_cart():
    curr_user_id = current_user.to_dict()["id"]
    user_cart_purchased = CartItem.query.filter(CartItem.userId == curr_user_id, CartItem.purchased == True).all()
    cart_item_list_of_dictionaries = [p.to_dict() for p in user_cart_purchased]

    cart_with_product_info = []

    for item in cart_item_list_of_dictionaries:
        product_id = item['productId']
        product_info = Product.query.filter(Product.id == product_id).first()
        if product_info:
            item_with_product_info = item.copy() #cart info
            item_with_product_info["Product"] = product_info.to_dict() #product info
            cart_with_product_info.append(item_with_product_info) #appending to create a list

    return {"PastCart": cart_with_product_info} #returning a CurrentCart object with a list of objects for each product with cart info and product info
    # return {"PastCart": [p.to_dict() for p in user_cart_purchased]}

#POST will be located within product_routes

#UPDATE item from PENDING CART -checked on postman, REMINDER: value is nullable, default false (not purchased), can leave blank and it will register as false
# @cart_routes.route("/<int:id>", methods=["PUT"])
# @login_required
# def update_current_cart_item(id):
#     curr_user_id = current_user.to_dict()["id"]
#     cart_item_to_update = CartItem.query.filter_by(userId=curr_user_id, id=id).first()

#     if not cart_item_to_update:
#         return {"message": "Product couldn't be found."}

#     form = UpdateCartItem()

#     form["csrf_token"].data = request.cookies["csrf_token"]
#     if form.validate_on_submit():
#         cart_item_to_update.cart_quantity=form.data["cart_quantity"]
#         cart_item_to_update.purchased=form.data["purchased"]

#         # pprint('THIS IS NEW_PRODUCT', new_product)
#         db.session.commit()
#         return cart_item_to_update.to_dict()
#     else:
#         return {"errors": form.errors}

@cart_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_current_cart_item(id):
    curr_user_id = current_user.to_dict()["id"]
    cart_item_to_update = CartItem.query.filter_by(userId=curr_user_id, id=id).first()

    if not cart_item_to_update:
        return {"message": "Product couldn't be found."}

    product_id = cart_item_to_update.productId
    product_info = Product.query.filter_by(id=product_id).first()

    if not product_info:
        return {"message": "Product information couldn't be found."}

    form = UpdateCartItem()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        cart_item_to_update.cart_quantity = form.data["cart_quantity"]
        cart_item_to_update.purchased = form.data["purchased"]

        db.session.commit()

        response_data = {
            "CurrentCart":
                {
                    "cart_quantity": cart_item_to_update.cart_quantity,
                    "createdAt": cart_item_to_update.createdAt,
                    "id": cart_item_to_update.id,
                    "productId": cart_item_to_update.productId,
                    "purchased": cart_item_to_update.purchased,
                    "updatedAt": cart_item_to_update.updatedAt,
                    "userId": cart_item_to_update.userId,
                    "workshopId": cart_item_to_update.workshopId,
                    "Product": {
                        "createdAt": product_info.createdAt,
                        "id": product_info.id,
                        "item_name": product_info.item_name,
                        "product_description": product_info.product_description,
                        "product_dimension": product_info.product_dimension,
                        "product_preview_image": product_info.product_preview_image,
                        "product_price": product_info.product_price,
                        "product_quantity": product_info.product_quantity,
                        "sellerId": product_info.sellerId,
                        "updatedAt": product_info.updatedAt,
                    },
                }
        
        }

        return response_data
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
    return{"item_data": cart_item_to_delete.to_dict(), "message": "Product successfully removed from your cart!"}
