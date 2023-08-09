from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, TextAreaField, FloatField
from wtforms.validators import DataRequired


class NewProduct(FlaskForm):
    item_name = StringField("Item Name", validators=[DataRequired()])
    product_price = FloatField("Price", validators=[DataRequired()])
    product_quantity = IntegerField("Product Quantity", validators=[DataRequired()])
    product_description = TextAreaField("Product Description", validators=[DataRequired()])
    product_dimension = TextAreaField("Product Dimension", validators=[DataRequired()])
    product_preview_image = StringField("Product Preview Image", validators=[DataRequired()])
    submit = SubmitField("Submit")
