
# Welcome to grounded.



A sleek and minimalist plant e-commerce haven, where simplicity meets lush greenery. Discover the perfect addition to your urban oasis while exploring our enriching workshops and health-focused articles, harmonizing your passion for plants with your journey to well-being. Inspired by soilboy.
# [grounded. Live](https://grounded-mfut.onrender.com/)

## - [Database Schema](https://github.com/CodeJellee/grounded/wiki/grounded.-Schema)  - [MVP](https://github.com/CodeJellee/grounded/wiki/grounded.-MVP%E2%80%90Feature%E2%80%90List) - [User Stories](https://github.com/CodeJellee/grounded/wiki/grounded.-User-Stories) - [Wireframes](https://github.com/CodeJellee/grounded/wiki/grounded.-Wireframes) -



## Preview
![Homepage](https://github.com/CodeJellee/grounded/assets/108435185/89f64776-356a-467e-a39b-4baf08be84b5)
![ProductPage](https://github.com/CodeJellee/grounded/assets/108435185/0324fa6e-a5ef-452b-810e-535dd09d0791)

## Getting Started


Clone this repository: https://github.com/CodeJellee/grounded.git

Create a .env file and insert the following environmental variables:
```
SECRET_KEY=xxxx
DATABASE_URL=sqlite:///dev.db
SCHEMA=xxxx


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
