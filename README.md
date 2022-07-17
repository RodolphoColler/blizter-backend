# blizter

<details open>
<summary><h2>/user<h2></summary>
  
<details>
<summary><h2>POST api/user<h2></summary>

To create a new user

```json
{
  "email": "test@gmail.com".
  "password": "1234567",
  "name": "test"
}
```

### Should return 

Jwt token

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```
  
<details>
<summary><h3>Errors<h3></summary>
 
> 400 - User already exist.

</details>
  
</details>
  
<details>
<summary><h2>PATCH  api/user/category/:id<h2></summary>

Associate some category to respective user

```json
{
  "categoryId": 1
}
```

> Should send an authorization header with an valid token

### Should return 

Array with all categories that are associated with the respective user

```json
[
  "Education", "Medical" ...
]
```
  
<details>
<summary><h3>Errors<h3></summary>
 
> 400 - User not exists.
 
> 400 - Category not existent.
  
> 400 - Your request must have a token.
  
> 401 - Not valid token.

</details>

</details>
