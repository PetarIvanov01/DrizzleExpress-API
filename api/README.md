# Fitness - API Overview ⭐

Hey there! I'm excited to introduce you to my `Fitness-API` — it's the backbone of my [Fitness-Store](https://github.com/PetarIvanov01/Fitness-shop) project! 💪 As I work on this API, not only am I leveling up my coding skills, but I'm also diving deep into new tech stack.

I will be glad to explore the API, contribute to its development, or use it as a reference for your own projects. Also don't forget to give feedback 😅.

## Table of Contents

-   [User Authentication Endpoints](#user-authentication-endpoints)
    -   [Login Endpoint](#login-endpoint)
    -   [Register Endpoint](#register-endpoint)
    -   [Logout Endpoint](#logout-endpoint)
    -   [Refresh Token Endpoint](#refresh-token-endpoint)
-   [User Profile Management Endpoints](#user-profile-management-endpoints)
    -   [Get Profile Endpoint](#get-profile-endpoint)
    -   [Update Profile Endpoint](#update-profile-endpoint)
    -   [Get User Addresses Endpoint](#get-user-addresses-endpoint)
    -   [Create/Add User Address Endpoint](#createadd-user-address-endpoint)
    -   [Update User Address Endpoint](#update-user-address-endpoint)
-   [Catalog Management Endpoints](#catalog-management-endpoints)
    -   [Get Catalog Endpoint](#get-catalog-endpoint)
    -   [Get Product Endpoint](#get-product-endpoint)

## Endpoints 📋

-   ### User Authentication Endpoints

    -   #### Login Endpoint

        -   Request Example:

            ```http
            Method: POST
            Path: /api/v1/user/sign-in
            Content-Type: application/json
            Body:
            {
                "email": "string",
                "password": "string"
            }
            ```

        -   Response Example:

            ```http
            Body:
            {
                "message": "You are logged",
                "payload": {
                    "id": "string",
                    "fullName": "string",
                    "email": "string",
                    "token": "string"
                }
            }
            ```

-   #### Register Endpoint

    -   Request Example:

        ```http
        Method: POST
        Path: /api/v1/user/sign-up
        Content-Type: application/json
        Body:
        {
            "email": "string",
            "password": "string",
            "rePassword": "string",
            "firstName": "string",
            "lastName": "string",
            "phoneNumber": "string"
        }
        ```

    -   Response Example:

        ```http
        Body: {
            "message": "You are registered",
            "payload": {
            "email": "string",
            "fullName": "string",
            "id": "string"
            "token": "string"
        }
        ```

-   #### Logout Endpoint

    -   Request Example:

        ```http
        Method: POST
        Path: /api/v1/user/logout
        Content-Type: application/json
        ```

    -   Response Example:

        ```http
        Body:
        {
            "message": "Logout successful"
        }
        ```

-   #### Refresh Token Endpoint

    -   Request Example:

        ```http
        Method: POST
        Path: /api/v1/user/refreshtoken
        Content-Type: application/json
        Set-Cookie: jwt-refresh=string; Path=/api/v1/user/refreshtoken; Expires=Date; HttpOnly; Secure
        Body:
        {
            "email": "string",
            "password": "string",
            "rePassword": "string",
            "firstName": "string",
            "lastName": "string",
            "phoneNumber": "string"
        }
        ```

    -   Response Example:

        ```http
        Body:
        {
            "message": "Tokens successfully refreshed.",
            "payload": {
                "email": "string",
                "fullName": "string",
                "id": "string"
                "token": "string"
            }
        }
        ```

> [!IMPORTANT] > **The endpoints below needs Authorization header as JWT token.**

-   ### User Profile Management Endpoints

    -   #### Get Profile Endpoint

        -   Request Example:

            ```http
            Method: GET
            Path: /api/v1/user/:userId
            Content-Type: application/json
            Authorization: string
            ```

        -   Response Example:

            ```http
            Body:
            {
                "firstName":"string",
                "email": "string",
                "lastName": "string",
                "phoneNumber": "string"
            }
            ```

    -   #### Update Profile Endpoint

        -   Request Example:

            ```http
            Method: PUT
            Path: /api/v1/user/:userId
            Content-Type: application/json
            Authorization: string
            Body:
            {
                "personalInfo": {
                    "/* Any field that is used in registration can be updated */"
                }
            }

            ```

        -   Response Example:

            ```http
            Body:
                {
                    "message": "Update user",
                    "updatedFields": {
                        "firstName": "petar"
                    }
                }

            ```

    -   #### Get User Addresses Endpoint

        -   Request Example:

            ```http
            Method: GET
            Path: /api/v1/user/address/:userId
            Content-Type: application/json
            Authorization: string
            ```

        -   Response Example

            ```http
            Body:
            {
                "message": "All user addresses",
                "payload": [
                    {
                        "address_id": "number",
                        "user_id": "string",
                        "country": "string | null",
                        "city": "string | null",
                        "address": "string | null",
                        "postcode": "number | null"
                    }
                ]
            }
            ```

    -   #### Create/Add User Address Endpoint

        -   Request Example:

            ```http
            Method: POST
            Path: /api/v1/user/address/:userId
            Content-Type: application/json
            Authorization: string
            Body:
            {
                "shippingInfo": {
                    "country": "string",
                    "city": "string",
                    "address": "string",
                    "postcode": "number"
                }
            }
            ```

        -   Response Example:

            ```http
            Body:
            {
                "message": "New address added",
                "payload": {
                        "address_id": "number",
                        "user_id": "string",
                        "country": "string",
                        "city": "string",
                        "address": "string",
                        "postcode": "number"
                    }
            }
            ```

    -   #### Update User Address Endpoint

        -   Request Example:

            ```http
            Method: PUT
            Path: /api/v1/user/address/:userId?addressId=string
            Content-Type: application/json
            Authorization: string
            Body:
            {
                "shippingInfo": {
                    "/* Any field that is used in add address can be updated */"
                }
            }
            ```

        -   Response Example:

            ```http
            Body:
            {
                "message": "Address {addressId} is update",
                "payload": {
                    "/* Only the updated fields */"
                }
            }
            ```

-   ### Catalog Management Endpoints

    -   #### Get Catalog Endpoint

        -   Request Example:

            ```http
            Method: GET
            Path: /api/v1/catalog
            ?Optional Query Params:
            {
                "category": "'cardio' | 'free-weights' | 'machines'",
                "sort_by": "'asc' | 'desc'",
                "from": "number",
                "to": "nubmer",
                "page": "number",
                "perPage": "number"
            }
            ```

        -   Response Example:

            ```http
            Body:
            {
                "itemsLng": 1,
                "result": [
                    {
                        "product_id": "string",
                        "categoriy_id": "number",
                        "title": "string",
                        "price": "string",
                        "description": "string",
                        "image": "string(image path)",
                        "type": "'cardio' | 'free-weights' | 'machines'",
                        "quantity": "number"
                    }
                ]
            }
            ```

    -   #### Get Product Endpoint

        -   Request Example:

            ```http
            Method: GET
            Path: /api/v1/catalog/:productId
            ```

        -   Response Example:

            ```http
            Body:
            {
                "result": {
                        "product_id": "string",
                        "category_id": "number",
                        "title": "string",
                        "price": "string",
                        "description": "string",
                        "image": "string(image path)"
                    }
            }
            ```

> [!IMPORTANT]
> The endpoint below is restricted to administrators only. Users must have admin privileges to access this endpoint.

-   #### Create Product Endpoint

    -   Request Example:

        ```http
        Method: POST
        Path: /api/v1/catalog
        Authorization: "string"
        Content-Type: multipart/form-data
        Body:
        {
            "email": "'string' /* Required for admin validation */"
            "category_id": "number",
            "description": "string",
            "price": "string",
            "title": "string",
            "image": "file"
        }
        ```

    -   Response Example:

        ```http
        Body:
        {
            "result": {
                "category_id": "number",
                "description": "string",
                "price": "string",
                "title": "string",
                "image": "file",
            }
        }
        ```

<!--
## Authorization

### JSON Web Tokens (JWT)

This API uses JSON Web Tokens (JWT) for user authentication and authorization. Here's how it works:

-   When a user registers or logs in successfully, they receive a JWT token.
-   This token should be included in the `Authorization` header of their subsequent requests to protected routes.
-   The API uses a middleware to verify and decode the JWT token to determine the user's identity and authorization level.

### Middleware for Authorization

To ensure that certain routes are accessible only to authenticated users, this API employs a middleware called `authorization`. Here's how it works:

1. **Token Extraction:** When a user makes a request to a protected route, the client should include the JWT token in the `Authorization` header of the request.

2. **Token Verification:** The `authorization` middleware intercepts the request and extracts the token from the `Authorization` header.

3. **Token Decoding:** It then verifies the token's validity using the `verifyToken` function, which checks if the token is valid and not expired.

4. **User Identification:** If the token is valid, the middleware decodes it to extract user information, such as the user's ID and email. This information is attached to the request object (`req.user`) for further processing in the route handler.

5. **Access Granted:** If the token is valid and the user is authenticated, the middleware allows the request to proceed to the route handler. The route can then access the user's information from `req.user` and perform actions based on the user's identity.

6. **Access Denied:** If the token is invalid, expired, or missing, the middleware throws an error, indicating that the user is not authorized to access the protected route.

Remember to include the JWT token in the `Authorization` header of your requests to protected routes to ensure successful authentication and access.

## Installation

Follow these steps to set up and run the Node.js Express MongoDB RESTful API on your local machine:

### Requirements

Before you begin, ensure you have the following software and tools installed:

-   `Node.js`: Ensure you have Node.js installed. You can download it from the official website.
-   `MongoDB`: MongoDB is the database used by this API. Download and install the MongoDB Community Edition on your machine.

### Clone the Repository

1. Clone this repository to your local machine using your preferred method (HTTPS or SSH)

2. Navigate to the project's root directory

### Install Dependencies

1. Install the project dependencies using npm

2. Create a .env file based and use this example:
    ```
    NODE_ENV=development
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/RestApi
    JWT_SECRET=dsadsad1221dasd
    ```

### Start the Server

The server will start, and you'll see a message indicating that it's running, typically on port 5000 `(http://localhost:5000)`.

### Test

Now that the API is running locally with MongoDB and your environment variables configured, you can use tools like `Postman` to make requests to the API endpoints. Refer to the "Usage" section of this README for details on available endpoints and their expected responses.
--!>
