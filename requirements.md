Requirements

Users
- Register
- Login

Posts
- Create post
- Get all posts
- Get single post
- Delete post

Comments
- Add comment
- Get comments


Endpoints
POST   /users/register
POST   /posts
GET    /posts




<!-- test credentials -->
{
    "password": "Doe@12345",
    "email": "JohnDoe@yahoo.com",
    "username": "John123"
}

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTM3MGE1Nzk2MjdlMTY2OGEwNjc3NTIiLCJpYXQiOjE3ODE5OTMyOTcsImV4cCI6MTc4MTk5Njg5N30.hDlf6xkafeJWQQ2Y3ELo4RQLvUEwFuc0kByIk9JYmMw


  "post": {
        "title": "My new post",
        "content": "creating an api",
        "userId": "6a370a579627e1668a067752",
        "createdAt": "2026-06-20T22:52:16.049Z",
        "_id": "6a3719a081e1ac251794fbc8"
    }


     "post": {
        "title": "Twitter post",
        "content": "creating an api as a frontend develope",
        "userId": "6a370a579627e1668a067752",
        "createdAt": "2026-06-20T22:54:06.141Z",
        "_id": "6a371a0e81e1ac251794fbc9"
    }