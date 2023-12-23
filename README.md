# MERN E-Commerce App

This is a full-stack E-Commerce application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a scalable and robust foundation for building an online shopping platform.

## Features

1. **User Authentication**: Users can create accounts, log in, and securely authenticate.
2. **Product Management**: Add, edit, and delete products with details such as name, description, price, and images.
3. **Shopping Cart**: Users can add products to their shopping cart and proceed to checkout.
4. **Order Processing**: Secure checkout process and order history for users.
5. **Admin Panel**: Separate dashboard for administrators to manage products, users, and orders.
6. **Responsive Design**: The application is designed to be accessible and usable on various devices.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/mern-e-commerce.git
    ```

2. Change into the project directory:

    ```bash
    cd mern-e-commerce
    ```

3. Install dependencies for the server:

    ```bash
    npm install
    ```

4. Change into the client directory and install client dependencies:

    ```bash
    cd client
    npm install
    ```

5. Go back to the project root:

    ```bash
    cd ..
    ```

6. Create a `.env` file in the root directory with the following variables:

    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongo_db_uri
    JWT_SECRET=your_jwt_secret
    ```

    Replace `your_mongo_db_uri` and `your_jwt_secret` with your MongoDB connection string and a secret key for JWT.

## Usage

1. Start the server:

    ```bash
    npm run server
    ```

2. Start the client:

    ```bash
    npm run client
    ```

3. Open your browser and visit [http://localhost:3000](http://localhost:3000)



## Technologies Used

- **Frontend**:
  - React.js
  - Redux (State Management)
  - Axios (HTTP requests)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Database)
  - Mongoose (Object Data Modeling)

- **Authentication**:
  - JSON Web Tokens (JWT)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
