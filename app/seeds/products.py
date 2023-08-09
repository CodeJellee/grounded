from app.models import db, Product, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products(users):
    products = [
        {
            "sellerId": 1,
            "item_name": "Young Ficus Elastica 'Black Prince'",
            "product_price": 39.22,
            "product_description": "Beautiful Ficus Elastica, also known as the 'Black Prince'.",
            "product_quantity": 4,
            "product_dimension": "W: 20-30 cm H: 35-40 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Young-Ficus-Elastica-as3.jpg"
        },
        {
            "sellerId": 1,
            "item_name": "Young Ficus Elastica",
            "product_price": 22.99,
            "product_description": "Basic Young Fiscus Elastica to add to your collection.",
            "product_quantity": 8,
            "product_dimension": "W: 10-20 cm H: 20-30 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Young-Ficus-elastica-AS2.jpg"
        },
        {
            "sellerId": 1,
            "item_name": "Feronailis Bonsai",
            "product_price": 55.00,
            "product_description": "This plant is grown as bonsai, and requires minimal pruning. A bright environment will be perfect for this centrepiece.",
            "product_quantity": 2,
            "product_dimension": "Potted Plant: W: 25-35 cm H: 40-50 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Feronailis-Bonsai.jpg"
        },
        {
            "sellerId": 1,
            "item_name": "Olive Tree",
            "product_price": 18.75,
            "product_description": "A beautiful tree with light sage coloured leaves, it is a popular choice for many modern interiors that have natural sunlight.",
            "product_quantity": 6,
            "product_dimension": "W 25-30 cm x H 60-80 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/olivetree-s-a-1.jpg"
        },
        {
            "sellerId": 1,
            "item_name": "Bending Sekka Hinoki Bonsai",
            "product_price": 28.50,
            "product_description": "This plant is grown as bonsai and requires minimal pruning. A bright environment will be perfect for this centrepiece.",
            "product_quantity": 3,
            "product_dimension": "W 10-12 cm x H 20-25 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Bending-Sekka-Hinoki-Potted.jpg"
        },
        {
            "sellerId": 1,
            "item_name": "Mini Oxalis hedysaroides (Fire fern)",
            "product_price": 16.99,
            "product_description": 'Oxalis hedysaroides, commonly known as "fire fern," is a charming perennial plant.',
            "product_quantity": 5,
            "product_dimension": "W: 5-6 cm H: 8-10 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/mini-oxalis.jpeg"
        },
        {
            "sellerId": 1,
            "item_name": "Oxalis hedysaroides (Fire fern)",
            "product_price": 30.50,
            "product_description": 'Oxalis hedysaroides, commonly known as "fire fern," is a charming perennial plant.',
            "product_quantity": 2,
            "product_dimension": "W: 9-12 cm H: 15-20 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/oxalis-hedy.jpeg"
        },
        {
            "sellerId": 1,
            "item_name": "Japanese Eucalyptus",
            "product_price": 12.99,
            "product_description": "Eucalyptus from Japan is a graceful evergreen tree with aromatic leaves and smooth bark.",
            "product_quantity": 7,
            "product_dimension": "W 12-15 cm x H 30-35 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/japanese-eucalyptus.jpeg"
        },
        {
            "sellerId": 1,
            "item_name": "Sleeping Pine Bonsai",
            "product_price": 24.75,
            "product_description": "This plant is grown as bonsai and requires minimal pruning.",
            "product_quantity": 4,
            "product_dimension": "W 30-35 cm x H 20-25cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Sleeping-Pine.jpg"
        },
        {
            "sellerId": 1,
            "item_name": "Stephania erecta",
            "product_price": 19.99,
            "product_description": "Stephania erecta, is a remarkable caudiciform specimen with a tuberous stem and round-shaped leaves.",
            "product_quantity": 6,
            "product_dimension": "W 12 cm x H 15-20 cmst",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/stephania-erecta.jpeg"
        },
        {
            "sellerId": 1,
            "item_name": "Dracaena reflexa",
            "product_price": 18.00,
            "product_description":"Dracaena reflexa, is a tropical shrub with glossy, reflexed leaves that are green with yellow stripes. It is a popular low maintenance indoor plant.",
            "product_quantity": 3,
            "product_dimension": "W: 20-30 cm H: 35-40 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/dracaena-reflexa.jpeg"
        },
        {
            "sellerId": 1,
            "item_name": "Everfresh Tree",
            "product_price": 32.50,
            "product_description": 'Pithecellobium Confertum is a popular foliage plant from Japan. Interestingly, the leaves close at night to conserve water, known as the "sleep exercise".',
            "product_quantity": 2,
            "product_dimension": "W 30-40 cm x H 40-50 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Everfresh_B-series.jpg"
        },
        {
            "sellerId": 1,
            "item_name": "Stephania Kaweesakii 'Nova'",
            "product_price": 8.99,
            "product_description": "Stephania Kaweesakii 'Nova', is a caudiciform specimen with a tuberous stem and huge, round-shaped leaves. It produces larger, yet fewer leaves compared to Stephania erecta.",
            "product_quantity": 9,
            "product_dimension": "W 10 - 15 cm x H 20-25 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Stephania-Kaweesakii-nova.jpeg"
        },
        {
            "sellerId": 1,
            "item_name": "Crimson Queen Maple Kokedama",
            "product_price": 14.50,
            "product_description": "The Crimson Queen maple kokedama is a Japanese art form where the Crimson Queen maple tree is wrapped in moss and bound with string.",
            "product_quantity": 5,
            "product_dimension": "W 10-12 cm x H 20-25 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Crimson-Queen-Maple-Kokedama.jpeg"
        },
        {
            "sellerId": 1,
            "item_name": "Cherry Blossom Bonsai",
            "product_price": 10.00,
            "product_description":"A cherry blossom bonsai is a miniature version of a cherry blossom tree, cultivated to bloom in a shallow pot.",
            "product_quantity": 12,
            "product_dimension": "W 10-12 cm x H 20-25 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/cherry-blossom-bonsai.jpeg"
        },
        {
            "sellerId": 2,
            "item_name": "Japanese White Pine 'Negishi'",
            "product_price": 28.99,
            "product_description": "Japanese White Pine 'Negishi', not to be confused with the more commonly known Japanese Black Pine, featuring beautiful silverish-blue short needles.",
            "product_quantity": 4,
            "product_dimension": "W 12 cm x H 15-20 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/japanese-white-pine-negishi.jpeg"
        },
        {
            "sellerId": 2,
            "item_name": "Sophora Prostrata 'Little Baby'",
            "product_price": 16.75,
            "product_description": "Sophora Prostrata. Imported from Japan.",
            "product_quantity": 6,
            "product_dimension": "W 20-30 cm x H 30 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Sophora_littlebaby.jpg"
        },
        {
            "sellerId": 2,
            "item_name": "Japanese Maple Bonsai 'Iroha-momiji'",
            "product_price": 21.50,
            "product_description":"Japanese Maple Bonsai 'Iroha-momiji' flown directly from Japan. It is acclimated to thrive in Singapore's climate.",
            "product_quantity": 3,
            "product_dimension": "W 30-35 cm x H 30-35 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Japanese-Maple-Bonsai-Iroha-momiji.jpeg"
        },
        {
            "sellerId": 2,
            "item_name": "Juniper Bonsai 5 Tiers",
            "product_price": 33.00,
            "product_description":  "This plant is grown as bonsai and requires minimal pruning.",
            "product_quantity": 2,
            "product_dimension": "W 20-25 cm x H 35-45 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Juniper+Bonsai+5+Tiers.jpeg"
        },
        {
            "sellerId": 2,
            "item_name": "Mini Rain Tree",
            "product_price": 25.99,
            "product_description": "Its leaves close at night and open up during the day.",
            "product_quantity": 5,
            "product_dimension": "W 20-25 cm x H 20-25 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Rain-Mini-1.jpg"
        },
        {
            "sellerId": 2,
            "item_name": "Japanese Black Pine - Pinus Thunbergii",
            "product_price": 14.25,
            "product_description": "This plant is grown as bonsai, and requires minimal pruning. A bright environment will be ideal.",
            "product_quantity": 8,
            "product_dimension": "W 20-25 cm x H 18-25 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Japanese-Black-Pine-Pinus-Thunbergii.jpeg"
        },
        {
            "sellerId": 2,
            "item_name": "Trident 'Kaede' Maple bonsai",
            "product_price": 19.00,
            "product_description": "A trident maple bonsai is a small, potted version of a trident maple tree.",
            "product_quantity": 4,
            "product_dimension": "W 10-12 cm x H 20-25 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Trident+'Kaede'+Maple+bonsai+.jpeg"
        },
        {
            "sellerId": 2,
            "item_name": "Asparagus Ferns",
            "product_price": 12.50,
            "product_description": "This is a type of asparagus fern that has dainty and wispy foliage.",
            "product_quantity": 7,
            "product_dimension": "W 20-25 cm x H 20-30 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Asparagus+Ferns.jpeg"
        },
        {
            "sellerId": 2,
            "item_name": "Stephania Suberosa",
            "product_price": 15.99,
            "product_description": "Potted with Soilboy Akadama Potting Mix.",
            "product_quantity": 6,
            "product_dimension": "W 7-10 cm x H 10-15 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Stephania-Suberosa.jpeg"
        },
        {
            "sellerId": 2,
            "item_name": "Phyllanthus Mirabilis",
            "product_price": 18.50,
            "product_description": "A caudiciform plant with reddish and green leaves. Interestingly, the leaves fold up in pairs during the evening.",
            "product_quantity": 3,
            "product_dimension": "W 15-20 cm x H 20-25 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Phyllanthus-Mirabilis.jpeg"
        },
        {
            "sellerId": 2,
            "item_name": "Adenia Glauca",
            "product_price": 26.00,
            "product_description": "Adenia Glauca is an uncommon caudiciform succulent-type plant from Southern Africa. It enjoys a bright window with some hours of direct sunlight and can tolerate a short period of time in dry soil.",
            "product_quantity": 2,
            "product_dimension": "W 9 cm x H 15-20 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Adenia-Glauca.jpeg"
        },
        {
            "sellerId": 2,
            "item_name": "Polyscias Bonsai",
            "product_price": 14.99,
            "product_description": "This plant is grown as bonsai, and requires minimal pruning. A bright environment will be perfect for this centrepiece.",
            "product_quantity": 5,
            "product_dimension": "W 9 - 12 cm x H 15-20 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Polyscias-bonsai.jpg"
        },
        {
            "sellerId": 2,
            "item_name": "Decarya Madagascariensis",
            "product_price": 18.99,
            "product_description": "A rare plant that originates from Madagascar! The branches grow in a zigzag manner with small spikes",
            "product_quantity": 4,
            "product_dimension": "W 9 cm x H 15-20 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Decarya-Madagascariensis.jpeg"
        },
        {
            "sellerId": 2,
            "item_name": "Trichodiadema Bulbosum",
            "product_price": 9.50,
            "product_description": "Stunning rare Trichodiadema Bulbosum.",
            "product_quantity": 9,
            "product_dimension": "W 9 - 12 cm x H 10-15 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Trichodiadema+Bulbosum.jpeg"
        },
        {
            "sellerId": 2,
            "item_name": "Variegated Polyscias Bonsai",
            "product_price": 13.75,
            "product_description": "This plant is grown as bonsai, and requires minimal pruning. A bright environment will be perfect for this centrepiece.",
            "product_quantity": 5,
            "product_dimension": "W 9 - 12 cm x H 15-20 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Variegated%2BPolycias%2BBonsai.jpg"
        },
            {
            "sellerId": 3,
            "item_name": "Miyabi Sekka Hinoki Bonsai",
            "product_price": 29.99,
            "product_description": "Sekka Hinoki Bonsai is a slow-growing, evergreen tree native to Japan, valued for its fine-textured foliage, elegant form, and aromatic wood.",
            "product_quantity": 4,
            "product_dimension": "W 10-12 cm x H 20-25 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Miyabi+Sekka+Hinoki+Bonsai.jpeg"
        },
        {
            "sellerId": 3,
            "item_name": "Japanese Maple 'Yugure' Tree",
            "product_price": 18.75,
            "product_description": "The Japanese Maple Yugure Tree Bonsai, with its striking red leaves that gracefully transform into vibrant green in Singapore’s climate.",
            "product_quantity": 6,
            "product_dimension": "W 18-25 cm x H 30-35 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/japanese-maple-yugure.jpeg"
        },
        {
            "sellerId": 3,
            "item_name": "Mini Cascading Juniper Bonsai",
            "product_price": 21.50,
            "product_description": "This plant is grown as bonsai, and requires minimal pruning.",
            "product_quantity": 3,
            "product_dimension": "W 20-25cm H-20-25cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Mini+Cascading+Juniper+Bonsai.jpeg"
        },
        {
            "sellerId": 3,
            "item_name": "Firmiana colorata",
            "product_price": 33.00,
            "product_description": "A caudiciform plant with reddish and green leaves. Interestingly, the leaves fold up in pairs during the evening.",
            "product_quantity": 2,
            "product_dimension": "W 30-35 cm x H 20-25 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Firmiana-colorata.jpeg"
        },
        {
            "sellerId": 3,
            "item_name": "Juniper Bonsai 3 Tiers",
            "product_price": 25.99,
            "product_description": "This plant is grown as bonsai and requires minimal pruning",
            "product_quantity": 5,
            "product_dimension": "W 20-25 cm x H 35-45 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Juniper+Bonsai+3+Tiers.jpeg"
        },
        {
            "sellerId": 3,
            "item_name": "Operculicarya Pachypus",
            "product_price": 14.25,
            "product_description": 'Operculicarya pachypus, commonly called the "Elephants Foot," is a succulent tree with a swollen trunk and small, oval-shaped leaves.',
            "product_quantity": 8,
            "product_dimension": "W 10-15 cm x H 20-25 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Operculicarya-Pachypus.jpeg"
        },
        {
            "sellerId": 3,
            "item_name": "Mini Boswellia socotrana",
            "product_price": 19.00,
            "product_description": "Boswellia socotrana seedlings are young plants of the rare Socotran frankincense tree.",
            "product_quantity": 4,
            "product_dimension": "W 6 cm x H 10-15 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Mini-Boswellia-socotrana.jpeg"
        },
        {
            "sellerId": 3,
            "item_name": "Mini Murraya bonsai",
            "product_price": 12.50,
            "product_description": "Murraya bonsai is a miniature version of the Murraya paniculata shrub. It features small, glossy, and aromatic leaves with white flowers, making it a popular choice for bonsai enthusiasts.",
            "product_quantity": 7,
            "product_dimension": "W 6 cm x H 10-12cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/mini-Murraya-Bonsai.jpeg"
        },
        {
            "sellerId": 3,
            "item_name": "Mini Phyllanthus Mirabilis",
            "product_price": 15.99,
            "product_description": "Phyllanthus mirabilis is a tropical plant characterized by its caudex and small, round, and reddish leaves. It is native to Southeast Asia.",
            "product_quantity": 6,
            "product_dimension": "9cm W x 10-12cm H",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Mini-Phyllanthus-Mirabilis.jpg"
        },
        {
            "sellerId": 3,
            "item_name": "Albuca concordiana",
            "product_price": 18.50,
            "product_description": "Albuca concordiana is a South African plant known for its slender leaves and delicate yellow flowers.",
            "product_quantity": 3,
            "product_dimension": "W 6 cm x H 10-15 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Albuca-concordiana.jpeg"
        },
        {
            "sellerId": 3,
            "item_name": "Monstera Deliciosa",
            "product_price": 26.00,
            "product_description": "Potted with Chunky Soil Mix.",
            "product_quantity": 2,
            "product_dimension": "W 30-40 cm x H 40-50 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Monstera_deliciosa.jpeg"
        },
        {
            "sellerId": 3,
            "item_name": "Hinoki Bonsai 04",
            "product_price": 14.99,
            "product_description": "Hinoki Bonsai is a slow-growing, evergreen tree native to Japan, valued for its fine-textured foliage, elegant form, and aromatic wood.",
            "product_quantity": 5,
            "product_dimension": "W 10-12 cm x H 14-18 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/hinoki-bonsai-04.jpeg"
        },
        {
            "sellerId": 3,
            "item_name": "Juniperus Chinensis",
            "product_price": 18.99,
            "product_description": "This plant is grown as bonsai and requires minimal pruning. A bright environment will be perfect for this centrepiece.",
            "product_quantity": 4,
            "product_dimension": "W 30-35 cm x H 40cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Juniper-chinensis.jpeg"
        },
        {
            "sellerId": 3,
            "item_name": "Margosa Tree",
            "product_price": 9.50,
            "product_description": "The Margosa tree, also known as Neem tree, is a fast-growing evergreen native. It has a spreading canopy, compound leaves, and bears small fragrant white flowers.",
            "product_quantity": 9,
            "product_dimension": "W: 10-20 cm H: 20-30 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Margosa%2BTree.jpg"
        },
        {
            "sellerId": 3,
            "item_name": "Murraya koenigii",
            "product_price": 13.75,
            "product_description": "Murraya koenigii is a small and aromatic tree. It has pinnate leaves, clusters of small white flowers.",
            "product_quantity": 5,
            "product_dimension": "W: 10-20 cm H: 20-30 cm",
            "product_preview_image": "https://groundedfullstack.s3.amazonaws.com/grounded_product_images/Murraya-koenigii.jpg"
        }

    ]

    for product in products:
        each_product = Product(**product)
        print(each_product)
        db.session.add(each_product)
        db.session.commit()
    return products


# Uses a raw SQL query to TRUNCATE or DELETE the products table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
