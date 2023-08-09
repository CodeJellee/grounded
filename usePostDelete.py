
# FOR ENV.PY BELOW

# from __future__ import with_statement

# import logging
# from logging.config import fileConfig

# from sqlalchemy import engine_from_config
# from sqlalchemy import pool

# from alembic import context

# import os
# environment = os.getenv("FLASK_ENV")
# SCHEMA = os.environ.get("SCHEMA")


# # this is the Alembic Config object, which provides
# # access to the values within the .ini file in use.
# config = context.config

# # Interpret the config file for Python logging.
# # This line sets up loggers basically.
# fileConfig(config.config_file_name)
# logger = logging.getLogger('alembic.env')

# # add your model's MetaData object here
# # for 'autogenerate' support
# # from myapp import mymodel
# # target_metadata = mymodel.Base.metadata
# from flask import current_app
# config.set_main_option(
#     'sqlalchemy.url',
#     str(current_app.extensions['migrate'].db.engine.url).replace('%', '%%'))
# target_metadata = current_app.extensions['migrate'].db.metadata

# # other values from the config, defined by the needs of env.py,
# # can be acquired:
# # my_important_option = config.get_main_option("my_important_option")
# # ... etc.


# def run_migrations_offline():
#     """Run migrations in 'offline' mode.
#     This configures the context with just a URL
#     and not an Engine, though an Engine is acceptable
#     here as well.  By skipping the Engine creation
#     we don't even need a DBAPI to be available.
#     Calls to context.execute() here emit the given string to the
#     script output.
#     """
#     url = config.get_main_option("sqlalchemy.url")
#     context.configure(
#         url=url, target_metadata=target_metadata, literal_binds=True
#     )

#     with context.begin_transaction():
#         context.run_migrations()


# def run_migrations_online():
#     """Run migrations in 'online' mode.
#     In this scenario we need to create an Engine
#     and associate a connection with the context.
#     """

#     # this callback is used to prevent an auto-migration from being generated
#     # when there are no changes to the schema
#     # reference: http://alembic.zzzcomputing.com/en/latest/cookbook.html
#     def process_revision_directives(context, revision, directives):
#         if getattr(config.cmd_opts, 'autogenerate', False):
#             script = directives[0]
#             if script.upgrade_ops.is_empty():
#                 directives[:] = []
#                 logger.info('No changes in schema detected.')

#     connectable = engine_from_config(
#         config.get_section(config.config_ini_section),
#         prefix='sqlalchemy.',
#         poolclass=pool.NullPool,
#     )

#     with connectable.connect() as connection:
#         context.configure(
#             connection=connection,
#             target_metadata=target_metadata,
#             process_revision_directives=process_revision_directives,
#             **current_app.extensions['migrate'].configure_args
#         )
#         # Create a schema (only in production)
#         if environment == "production":
#             connection.execute(f"CREATE SCHEMA IF NOT EXISTS {SCHEMA}")

#         # Set search path to your schema (only in production)
#         with context.begin_transaction():
#             if environment == "production":
#                 context.execute(f"SET search_path TO {SCHEMA}")
#             context.run_migrations()

# if context.is_offline_mode():
#     run_migrations_offline()
# else:
#     run_migrations_online()




# FOR VERSION BELOW: -------------------------------------

# import os
# environment = os.getenv("FLASK_ENV")
# SCHEMA = os.environ.get("SCHEMA")



# def upgrade():
#     # ### commands auto generated by Alembic - please adjust! ###
#     op.create_table('users',
#     sa.Column('id', sa.Integer(), nullable=False),
#     sa.Column('first_name', sa.String(length=40), nullable=False),
#     sa.Column('last_name', sa.String(length=40), nullable=False),
#     sa.Column('email', sa.String(length=255), nullable=False),
#     sa.Column('username', sa.String(length=40), nullable=False),
#     sa.Column('hashed_password', sa.String(length=255), nullable=False),
#     sa.PrimaryKeyConstraint('id'),
#     sa.UniqueConstraint('email'),
#     sa.UniqueConstraint('username')
#     )

#     if environment == "production":
#         op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

#     op.create_table('articles',
#     sa.Column('id', sa.Integer(), nullable=False),
#     sa.Column('authorId', sa.Integer(), nullable=False),
#     sa.Column('article_title', sa.String(length=225), nullable=False),
#     sa.Column('article_description', sa.Text(), nullable=False),
#     sa.Column('article_link', sa.Text(), nullable=False),
#     sa.Column('createdAt', sa.DateTime(), nullable=True),
#     sa.Column('updatedAt', sa.DateTime(), nullable=True),
#     sa.ForeignKeyConstraint(['authorId'], ['users.id'], ),
#     sa.PrimaryKeyConstraint('id')
#     )

#     if environment == "production":
#         op.execute(f"ALTER TABLE articles SET SCHEMA {SCHEMA};")

#     op.create_table('products',
#     sa.Column('id', sa.Integer(), nullable=False),
#     sa.Column('sellerId', sa.Integer(), nullable=False),
#     sa.Column('item_name', sa.String(length=225), nullable=False),
#     sa.Column('product_price', sa.Numeric(precision=10, scale=2), nullable=False),
#     sa.Column('product_quantity', sa.Integer(), nullable=False),
#     sa.Column('product_description', sa.Text(), nullable=False),
#     sa.Column('product_dimension', sa.Text(), nullable=False),
#     sa.Column('product_preview_image', sa.Text(), nullable=False),
#     sa.Column('createdAt', sa.DateTime(), nullable=True),
#     sa.Column('updatedAt', sa.DateTime(), nullable=True),
#     sa.ForeignKeyConstraint(['sellerId'], ['users.id'], ),
#     sa.PrimaryKeyConstraint('id')
#     )


#     if environment == "production":
#         op.execute(f"ALTER TABLE products SET SCHEMA {SCHEMA};")

#     op.create_table('workshops',
#     sa.Column('id', sa.Integer(), nullable=False),
#     sa.Column('creatorId', sa.Integer(), nullable=False),
#     sa.Column('workshop_title', sa.String(length=225), nullable=False),
#     sa.Column('workshop_description', sa.Text(), nullable=False),
#     sa.Column('workshop_price', sa.Numeric(precision=10, scale=2), nullable=False),
#     sa.Column('workshop_date', sa.Date(), nullable=False),
#     sa.Column('workshop_time', sa.Time(), nullable=False),
#     sa.Column('workshop_location', sa.String(length=225), nullable=False),
#     sa.Column('workshop_duration', sa.Integer(), nullable=False),
#     sa.Column('workshop_image', sa.Text(), nullable=False),
#     sa.Column('createdAt', sa.DateTime(), nullable=True),
#     sa.Column('updatedAt', sa.DateTime(), nullable=True),
#     sa.ForeignKeyConstraint(['creatorId'], ['users.id'], ),
#     sa.PrimaryKeyConstraint('id')
#     )

#     if environment == "production":
#         op.execute(f"ALTER TABLE workshops SET SCHEMA {SCHEMA};")

#     op.create_table('cart_items',
#     sa.Column('id', sa.Integer(), nullable=False),
#     sa.Column('userId', sa.Integer(), nullable=True),
#     sa.Column('productId', sa.Integer(), nullable=False),
#     sa.Column('workshopId', sa.Integer(), nullable=True),
#     sa.Column('cart_quantity', sa.Integer(), nullable=False),
#     sa.Column('createdAt', sa.DateTime(), nullable=True),
#     sa.Column('updatedAt', sa.DateTime(), nullable=True),
#     sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
#     sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
#     sa.ForeignKeyConstraint(['workshopId'], ['workshops.id'], ),
#     sa.PrimaryKeyConstraint('id')
#     )

#     if environment == "production":
#         op.execute(f"ALTER TABLE cart_items SET SCHEMA {SCHEMA};")

#     op.create_table('product_images',
#     sa.Column('id', sa.Integer(), nullable=False),
#     sa.Column('productId', sa.Integer(), nullable=True),
#     sa.Column('product_image', sa.Text(), nullable=True),
#     sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
#     sa.PrimaryKeyConstraint('id')
#     )

#     if environment == "production":
#         op.execute(f"ALTER TABLE product_images SET SCHEMA {SCHEMA};")
#     # ### end Alembic commands ###


# def downgrade():
#     # ### commands auto generated by Alembic - please adjust! ###
#     op.drop_table('product_images')
#     op.drop_table('cart_items')
#     op.drop_table('workshops')
#     op.drop_table('products')
#     op.drop_table('articles')
#     op.drop_table('users')
#     # ### end Alembic commands ###
