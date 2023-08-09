from flask_wtf import FlaskForm
from wtforms import (StringField, SubmitField, TextAreaField)
from wtforms.validators import DataRequired

class NewArticle(FlaskForm):
    article_title = StringField("Article Title", validators=[DataRequired()])
    article_description = TextAreaField("Article Description", validators=[DataRequired()])
    article_link = TextAreaField("Article Location", validators=[DataRequired()])

    submit = SubmitField("Submit")
