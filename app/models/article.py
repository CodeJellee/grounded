from .db import db, environment, SCHEMA, add_prefix_for_prod

class Article(db.Model):
    __tablename__ = "articles"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    authorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    article_title = db.Column(db.String(225), nullable=False)
    article_description = db.Column(db.Text, nullable=False)
    article_link = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now())

    #RELATIONSHIPS
    #Many to One respectively: Articles to User
    author = db.relationship("User", back_populates="article")
    #

    def to_dict(self):
        return {
            "id": self.id,
            "authorId": self.authorId,
            "article_title": self.article_title,
            "article_description": self.article_description,
            "article_link": self.article_link,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
