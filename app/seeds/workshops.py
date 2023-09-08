from app.models import db, Product, User, Workshop, cartItem, environment, SCHEMA
from sqlalchemy.sql import text


def seed_workshops(users):
    workshops = [
        {
            "creatorId": 1,
            "workshop_title": "Young Ficus Elastica 'Black Prince'",
            "workshop_description": "Come out and do some yoga!",
            "workshop_price": 50.99,
            "workshop_date": 4,
            "workshop_time": "W: 25 - 30 cm x H: 35 - 40 cm",
            "workshop_location": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Young-Ficus-Elastica-as3.jpg",
            "workshop_duration": 3,
            "workshop_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Young-Ficus-Elastica-as3.jpg",
        },

    ]

    for workshop in workshops:
        each_workshop = Workshop(**workshop)
        print(each_workshop)
        db.session.add(each_workshop)
        db.session.commit()
    return workshops


# Uses a raw SQL query to TRUNCATE or DELETE the products table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_workshops():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.workshops RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM workshops"))

    db.session.commit()
