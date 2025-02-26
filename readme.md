# Security Vulnerabilities in the Original Code #

**SQL Injection**: The query SELECT * FROM users WHERE username = '${username}' AND password = '${password}' is vulnerable to SQL injection. If a user provides malicious input, it could potentially allow an attacker to manipulate the database query and gain unauthorized access to the system.

**Storing Passwords in Plaintext**: The code directly compares the provided password with the stored password from the database. Storing passwords as plaintext and comparing them like this is a major security flaw. If an attacker gains access to the database, they can read the passwords easily.

**Insecure Token Generation**: The token "dummy_token" is hardcoded and does not provide any real security. A secure token should be generated dynamically using a robust method like JSON Web Tokens (JWT).




# Explanations of Fixes #

## SQL Injection Protection (Parameterized Queries):##
**Fix**: Replaced the raw SQL query with a parameterized query using $1 for the username and an array [username] for the query parameter. This prevents SQL injection attacks by ensuring that user inputs are properly escaped.
**Reason**: Parameterized queries ensure that input data is handled as a parameter and not directly inserted into the SQL string, preventing malicious injection of SQL code.


## Password Hashing:##

**Fix**: Instead of comparing the password directly with a stored plaintext password, we use bcrypt.compare() to securely compare the hashed password in the database with the provided password.
**Reason**: Passwords should never be stored in plaintext. bcrypt is a hashing algorithm designed for securely storing passwords. It ensures that even if the database is compromised, the passwords cannot be easily obtained.


## Secure Token Generation (JWT):##
**Fix**: Replaced the hardcoded "dummy_token" with a secure JWT token, generated using jwt.sign(). The token is signed with a secret key (JWT_SECRET) and includes the user's id and username as payload. The token is set to expire in 1 hour (expiresIn: '1h').

**Reason**: A JWT provides a secure way to authenticate users by using a token that can be verified with a secret key. It is also more flexible and robust than a hardcoded dummy token, which has no real security.


# Usage #

## Clone the Repository ##
 ```bash 
 git clone <repository-url>
cd <repository-directory>
```


## Initialize the Project:##
```bash 
npm init -y
```
## Install Required Dependencies ##
```bash 
npm install express bcrypt jsonwebtoken body-parser

```

## Run the Application ## 
```bash 
node server.js
```
