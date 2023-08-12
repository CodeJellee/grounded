from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class UpdateCartItem(FlaskForm):
    cart_quantity = IntegerField("Product Quantity", validators=[DataRequired()])
    purchased = BooleanField("Purchased")
    submit = SubmitField("Submit")
