# Hacktiv8-Overflow 

https://hacktiv-overflow.andresudi.club/

## User Route

| Route           | Method | Description          | Attributes        |
| --------------- | ------ | -------------------- | ----------------- |
| /users          | GET    | Get all users data   |                   |
| /users/register | POST   | Register new account | name, email, pass |
| /users/login    | POST   | Login                | email, pass       |

## Question Route

| Route                  | Method | Description          | Attributes                      |
| ---------------------- | ------ | -------------------- | ------------------------------- |
| /questions             | POST   | Create a question    | title, desc, token              |
| /questions             | GET    | Get all questions    |                                 |
| /questions/me          | GET    | Get all my questions | token                           |
| /questions/:id         | GET    | Get one question     | id question                     |
| /questions/:id         | PUT    | Update one question  | id question, token, title, desc |
| /questions/:id         | DELETE | Delete one question  | id question, token              |
| /questions/like/:id    | PUT    | Like one question    | id question, token              |
| /questions/dislike/:id | PUT    | Dislike one question | id question, token              |

## Answer Route

| Route                | Method | Description                     | Attributes                 |
| -------------------- | ------ | ------------------------------- | -------------------------- |
| /answers/:question   | POST   | Create a answer                 | id question, token, answer |
| /answers/:question   | GET    | Get all answers in one question | id question                |
| /answers/one/:id     | GET    | Get one answer                  | id answer                  |
| /answers/:id         | PUT    | Update one answer               | id answer, token           |
| /answers/like/:id    | PUT    | Like one answer                 | id answer, token           |
| /answers/dislike/:id | PUT    | Dislike one answer              | id answer, token           |


