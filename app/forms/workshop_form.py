from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, FloatField, DateField, TimeField
from wtforms.validators import DataRequired

class NewWorkshop(FlaskForm):
    workshop_title = StringField("Workshop Title", validators=[DataRequired()])
    workshop_description = TextAreaField("Workshop Description", validators=[DataRequired()])
    workshop_price = FloatField("Workshop Price", validators=[DataRequired()])
    workshop_date = DateField("Workshop Date", validators=[DataRequired()])
    workshop_time = TimeField("Workshop Time", validators=[DataRequired()])
    workshop_location = TextAreaField("Workshop Location", validators=[DataRequired()])
    workshop_duration = FloatField("Price", validators=[DataRequired()])
    workshop_image = StringField("Workshop Image", validators=[DataRequired()])
    submit = SubmitField("Submit")
