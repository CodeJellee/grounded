from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class NewProductImage(FlaskForm):
    product_image = StringField("Product Image", validators=[DataRequired()])
    submit = SubmitField('Submit')
