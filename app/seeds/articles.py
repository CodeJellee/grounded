from app.models import db, environment, SCHEMA, Product, User, CartItem, Article
from sqlalchemy.sql import text


def seed_articles(users):
    articles = [
        {
            "authorId": 1,
            "article_title": "Western Medicine",
            "article_description": "Doctors, surgeons and other healthcare providers who practice Western medicine rely on evidence-based medicine to diagnose and treat symptoms and conditions. Western medicine uses scientifically proven methods to improve your overall health. Your provider may also use complementary medicine, including Chinese (Eastern) medicine, to ease symptoms.",
            "article_link": "https://my.clevelandclinic.org/health/articles/22835-western-medicine",
        },
        {
            "authorId": 1,
            "article_title": "What Are Some Homeopathic Options for Treating Anxiety?",
            "article_description": "If you have anxiety and want to try homeopathy despite limited scientific evidence, here are some treatments you may want to try. Note that these recommendations are made by the homeopathy industry, and not mainstream doctors.",
            "article_link": "https://www.healthline.com/health/homeopathy-for-anxiety",
        },
        {
            "authorId": 1,
            "article_title": "Homeopathic Remedies for ADHD: Research and Reviews of Natural Treatments",
            "article_description": "Homeopathy has its critics, but many with ADHD believe it helps relieve symptoms of hyperactivity, inattention, and anxiety. Here, read scientific research — and ADDitude reader reviews — on some of the most popular homeopathic remedies for ADHD symptoms.",
            "article_link": "https://www.additudemag.com/homeopathy-for-adhd-popular-remedies-scientific-evidence/",
        },
        {
            "authorId": 1,
            "article_title": "Homeopathic vs Conventional Treatment of Vertigo",
            "article_description": "To compare the efficacy and safety of a homeopathic remedy (Vertigoheel, Heel Inc, Albuquerque, NM) vs betahistine hydrochloride (active control) in the treatment of patients with vertigo of various origins in a confirmative equivalence trial.",
            "article_link": "https://jamanetwork.com/journals/jamaotolaryngology/fullarticle/220470",
        },
        {
            "authorId": 1,
            "article_title": "The Best Homeopathic Remedies for Anxiety, Stress and Sleep",
            "article_description": "Good sleep is a key cornerstone of good health. Without good sleep you can feel restless, anxious, stressed, cranky, foggy, angry, sad – a real mixed bag of often unstable emotions. This can make you feel really unbalanced.",
            "article_link": "https://www.healthyhomeopathy.co.uk/best-homeopathic-remedies-for-anxiety-stress-and-sleep/",
        },
    ]

    for article in articles:
        each_article = Article(**article)
        db.session.add(each_article)
        db.session.commit()
    return articles




# Uses a raw SQL query to TRUNCATE or DELETE the products table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_articles():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.articles RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM articles"))

    db.session.commit()
