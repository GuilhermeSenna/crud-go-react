# golang-api-test

#### Crud performed using the Go language with Gin (WEB framework) and Gorm (ORM) in PostgreSQL database.

---

#### How to run?

> docker-compose up --build

#### Which ports will be used?

- 5432 for PostgreSQL database.
- For the server it can be defined dynamically in the .env with the API_PORT variable

---

#### Used routes:

- (GET) /customers - Get the first 50 customers
- (GET) /customers/:id - Get a customer's information by ID
- (POST) /customers - Create a new customer
  - firstName (string)
  - lastName (string)
  - email (string)
  - password (string)
- (PUT) /customers/:id - Edit a customer
