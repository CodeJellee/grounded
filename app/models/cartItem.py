from .db import db, environment, SCHEMA, add_prefix_for_prod

class CartItem(db.Model):
    __tablename__ = "cart_items"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=True)
    workshopId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("workshops.id")), nullable=True)
    cart_quantity = db.Column(db.Integer, nullable=False)
    purchased = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now())

    #RELATIONSHIPS
    #One to One respectively: CartItem to User
    user = db.relationship("User", back_populates="cart")
    #One to Many respectively: CartItem to Products
    product = db.relationship("Product", back_populates="cart")
    #One to Many respectively: CartIem to Workshops
    workshop = db.relationship("Workshop", back_populates="cart")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "productId": self.productId,
            "workshopId": self.workshopId,
            "cart_quantity": self.cart_quantity,
            "purchased": self.purchased,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
