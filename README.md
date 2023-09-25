
# Welcome to grounded.



A sleek and minimalist plant e-commerce haven, where simplicity meets lush greenery. Discover the perfect addition to your urban oasis while exploring our enriching workshops and health-focused articles, harmonizing your passion for plants with your journey to well-being. Inspired by soilboy.

# [grounded. Live](https://grounded-mfut.onrender.com/)

## Getting Started



Clone this repository: https://github.com/itsmingyoo/bangersounds.git

Create a .env file and insert the following environmental variables:
```
SECRET_KEY=xxxx
DATABASE_URL=sqlite:///dev.db
SCHEMA=xxxx

<!-- # AWS user access key
S3_BUCKET=xxxx
S3_KEY=xxxx
S3_SECRET=xxxx
``` -->



Create a .flaskenv file and insert the following environmental variables:

```
FLASK_APP=app

FLASK_ENV=development

FLASK_DEBUG=True
```



From the root directory, run the following command in the terminal:



```
pipenv install -r requirements.txt
```



Still in the root directory, run the following commands in the terminal:

```
pipenv shell
```
```
flask db migrate
```
```
flask db init
```
```
flask db upgrade
```
```
flask db seed all
```
```
flask run
```

Next run this in the terminal

```
cd react-app
```
```
npm install
```
```
npm start
```

Now you're done! You should be able to see the project now and adjust it to your liking.
