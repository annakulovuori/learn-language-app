
# Learn-language-app
An application that can be used to train foreign language. The end user is prompted with foreign language words and user must write the correct translation.
Ability to add, edit and delete word pairs.

# Motivation
Final assignment of backend course.

# Screenshots
Include logo/demo screenshot etc.

# Tech/framework used
Language: javascript, react, html, node
External modules used: Flask, Gunicorn, bcrypt, firebase-admin

# Installation
Provide step by step series of examples and explanations about how to get a development env running.

# Tests
GET http://localhost:8080/api/words

POST http://localhost:8080/api/words
Content-Type: application/json
{"word1": "dog", "word2": "koira"}

DELETE http://localhost:8080/api/words/3

PUT http://localhost:8080/api/words/4
Content-Type: application/json
{"word1": "cat", "word2": "kissa"}

# Author
Anna Kulovuori (https://github.com/annakulovuori)

MIT © annakulovuori
