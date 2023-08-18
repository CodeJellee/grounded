from app.models import db, environment, SCHEMA, Product, User, CartItem
from sqlalchemy.sql import text



def seed_cart_items(users, products):
    cart_items = [
        {
            "userId": 1,
            "productId": 16,
            "cart_quantity": 2,
            "purchased": False,
        },
        {
            "userId": 1,
            "productId": 17,
            "cart_quantity": 1,
            "purchased": False,
        },
        {
            "userId": 1,
            "productId": 18,
            "cart_quantity": 3,
            "purchased": False,
        },
        {
            "userId": 1,
            "productId": 19,
            "cart_quantity": 1,
            "purchased": False,
        },
        # {
        #     "userId": 1,
        #     "productId": 20,
        #     "cart_quantity": 1,
        #     "purchased": True,
        # },
        # {
        #     "userId": 1,
        #     "productId": 21,
        #     "cart_quantity": 2,
        #     "purchased": True,
        # },
        # {
        #     "userId": 1,
        #     "productId": 22,
        #     "cart_quantity": 1,
        #     "purchased": True,
        # },
    ]

    for item in cart_items:
        each_item = CartItem(**item)
        db.session.add(each_item)
        db.session.commit()
    return cart_items




# Uses a raw SQL query to TRUNCATE or DELETE the products table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cart_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM cart_items"))

    db.session.commit()
