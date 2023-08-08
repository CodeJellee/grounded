from .db import db, environment, SCHEMA, add_prefix_for_prod

class Workshop(db.Model):
    __tablename__ = "workshops"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    workshop_title = db.Column(db.String(225), nullable=False)
    workshop_description = db.Column(db.Text, nullable=False)
    workshop_price = db.Column(db.Numeric(precision=10, scale=2), nullable = False)
    workshop_date = db.Column(db.Date, nullable=False)
    workshop_location = db.Column(db.String(225), nullable=False)
    workshop_duration = db.Column(db.Integer, nullable=False)
    workshop_image = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now())

    #RELATIONSHIPS

    #

    def to_dict(self):
        return{
            "id": self.id,
            "creatorId": self.creatorId,
            "workshop_title": self.workshop_title,
            "workshop_description": self.workshop_description,
            "workshop_price": self.workshop_price,
            "workshop_date": self.workshop_date,
            "workshop_location": self.workshop_location,
            "workshop_duration": self.workshop_duration,
            "workshop_image": self.workshop_image,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
