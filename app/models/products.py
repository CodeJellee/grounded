from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sellerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    item_name = db.Column(db.String(225))
    product_price = db.Column(db.Numeric(precision=10, scale=2), nullable = False)
    product_quantity = db.Column(db.Integer, nullable=False)
    product_description = db.Column(db.Text, nullable=False)
    product_preview_image = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now())

    ##RELATIONSHIPS

    def to_dict(self):
        return{
            "id": self.id,
            "sellerId": self.sellerId,
            "item_name": self.item_name,
            "product_price": self.product_price,
            "product_quantity": self.product_quantity,
            "product_description": self.product_description,
            "product_preview_image": self.product_preview_image,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
