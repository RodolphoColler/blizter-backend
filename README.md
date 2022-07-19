# blizter

<details>
<summary><h2>/user<h2></summary>
  
<details>
<summary><h2>POST api/user<h2></summary>

To create a new user

```json
{
  "email": "test@gmail.com",
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
<summary><h2>GET  api/user/category/:id<h2></summary>

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
  
> 400 - Your request must have a token.
  
> 401 - Not valid token.

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
</detials>
</details>
</details>



<details>
<summary><h2>/expenditure<h2></summary>

<details>
<summary><h2>POST api/expenditure<h2></summary>

Create a new expenditure

```json
{
  "value": 100,
  "date": "2022-05-17",
  "category": "Education",
  "description": "New Books"
}
```

> Should send an authorization header with an valid token

### Should return 

Object with the new expenditure

```json
{
  "expenditure": {
    "id": 75,
    "value": 100,
    "description": "New Books",
    "userId": 1,
    "date": "2022-05-17T00:00:00.000Z",
    "category": "Education"
  }
}
```
  
<details>
 
<summary><h3>Errors<h3></summary>
 
> 400 - Category not existent.
  
> 400 - Your request must have a token.
  
> 401 - Not valid token.

</details>
</details>

<details>
<summary><h2>GET api/expenditure/:id?date&category<h2></summary>

Read and filter based on query parameters

> Date is used to search the expenditures in determinated month, so the use is, set the current year, month and the last day of the current month and it will return every expenditure from this month

> Example api/expenditure/1?date=2022-05-31&category=Education

> Should send an authorization header with an valid token

### Should return 

Array with the filtered expenditures

```json
{
  "expenditures": [
    {
      "id": 53,
      "value": 350,
      "description": "Programming Books",
      "userId": 1,
      "date": "2022-06-13T00:00:00.000Z",
      "category": "Education"
    },
    {
      "id": 60,
      "value": 1000,
      "description": "New Course",
      "userId": 1,
      "date": "2022-06-13T00:00:00.000Z",
      "category": "Education"
    }
  ]
}
```
  
<details>
 
<summary><h3>Errors<h3></summary>
 
> 400 - Category not existent.

> 400 - User not exists.
  
> 400 - Your request must have a token.
  
> 401 - Not valid token.

</details>
</details>
  
<details>
<summary><h2>GET api/expenditure/month/:id?date&category<h2></summary>

Sum of all expenditures with such a month and category

> Example api/expenditure/month/1?date=2022-05-31&category=Education

> Should send an authorization header with an valid token
  
__category is a opcional parameter__

### Should return 

Object with sum of all expenditures

```json
{
  "monthExpense": {
    "value": 100
  }
}
```
  
<details>
 
<summary><h3>Errors<h3></summary>

> 400 - User not exists.
  
> 400 - Your request must have a token.
  
> 401 - Not valid token.

</details>
</details>
  
<details>
<summary><h2>DELETE api/expenditure/:id<h2></summary>

Delete an expenditure with such id

### Should return 

Deleted expenditure

```json
{
  "expenditure": {
    "id": 75,
    "value": 100,
    "description": "New Books",
    "userId": 1,
    "date": "2022-05-17T00:00:00.000Z",
    "category": "Education"
  }
}
```
  
<details>
 
<summary><h3>Errors<h3></summary>
  
> 400 - Expenditure not existent.
  
> 401 - Not valid token.
  
> 400 - Your request must have a token.

</details>
</details>
</details>
  
  
<details>
<summary><h2>/salary<h2></summary>
  
<details>
<summary><h2>POST api/salary<h2></summary>
  
Create a new salary
  
> Should send an authorization header with an valid token
  
```json
{
  "value": 100,
  "date": "2022-05-17",
}
```
  
### Should return 

Object with the new salary

```json
{
  "salary": {
    "id": 75,
    "value": 100,
    "userId": 1,
    "date": "2022-05-17T00:00:00.000Z",
  }
}
```
  
<details>
 
<summary><h3>Errors<h3></summary>
 
> 400 - User not exists.
  
> 400 - Your request must have a token.
  
> 401 - Not valid token.

</details>
</details>
  
<details>
<summary><h2>GET api/salary/:id?date<h2></summary>
  
Read a user salary based on query date
  
> Example api/salary/1?date=2022-05-31
  
> Should send an authorization header with an valid token
  
### Should return 

Object with the salary

```json
{
  "salary": {
    "id": 75,
    "value": 100,
    "userId": 1,
    "date": "2022-05-17T00:00:00.000Z",
  }
}
```
  
<details>
 
<summary><h3>Errors<h3></summary>
 
> 400 - User not exists.
  
> 400 - Salary not exists.
  
> 400 - Your request must have a token.
  
> 401 - Not valid token.

</details>
</details>
  
<details>
<summary><h2>PATCH api/salary/:id<h2></summary>
  
Update a user salary
  
```json
{
  "value": 500,
}
```
  
> Should send an authorization header with an valid token
  
### Should return 

Object with updated salary

```json
{
  "salary": {
    "id": 75,
    "value": 500,
    "userId": 1,
    "date": "2022-05-17T00:00:00.000Z",
  }
}
```
  
<details>
 
<summary><h3>Errors<h3></summary>
 
> 400 - User not exists.
  
> 400 - Salary not exists.
  
> 400 - Your request must have a token.
  
> 401 - Not valid token.

</details>
</details>
  
  
</details>
</detials>

</detials>

