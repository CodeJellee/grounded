"""empty message

Revision ID: e9788061803e
Revises:
Create Date: 2023-08-10 02:28:29.398519

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e9788061803e'
down_revision = None
branch_labels = None
depends_on = None
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")


    op.create_table('articles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('authorId', sa.Integer(), nullable=False),
    sa.Column('article_title', sa.String(length=225), nullable=False),
    sa.Column('article_description', sa.Text(), nullable=False),
    sa.Column('article_link', sa.Text(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['authorId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE articles SET SCHEMA {SCHEMA};")

    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sellerId', sa.Integer(), nullable=False),
    sa.Column('item_name', sa.String(length=225), nullable=False),
    sa.Column('product_price', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('product_quantity', sa.Integer(), nullable=False),
    sa.Column('product_description', sa.Text(), nullable=False),
    sa.Column('product_dimension', sa.Text(), nullable=False),
    sa.Column('product_preview_image', sa.Text(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['sellerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE products SET SCHEMA {SCHEMA};")

    op.create_table('workshops',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creatorId', sa.Integer(), nullable=False),
    sa.Column('workshop_title', sa.String(length=225), nullable=False),
    sa.Column('workshop_description', sa.Text(), nullable=False),
    sa.Column('workshop_price', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('workshop_date', sa.Date(), nullable=False),
    sa.Column('workshop_time', sa.Time(), nullable=False),
    sa.Column('workshop_location', sa.String(length=225), nullable=False),
    sa.Column('workshop_duration', sa.Integer(), nullable=False),
    sa.Column('workshop_image', sa.Text(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['creatorId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE workshops SET SCHEMA {SCHEMA};")


    op.create_table('cart_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('productId', sa.Integer(), nullable=False),
    sa.Column('workshopId', sa.Integer(), nullable=False),
    sa.Column('cart_quantity', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.ForeignKeyConstraint(['workshopId'], ['workshops.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE cart_items SET SCHEMA {SCHEMA};")


    op.create_table('product_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('productId', sa.Integer(), nullable=True),
    sa.Column('product_image', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE product_images SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('product_images')
    op.drop_table('cart_items')
    op.drop_table('workshops')
    op.drop_table('products')
    op.drop_table('articles')
    op.drop_table('users')
    # ### end Alembic commands ###
