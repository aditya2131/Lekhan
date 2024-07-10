# LEKHAN

Welcome to the LEKHAN! This project is a simple blog site built using Node.js, Express.js, EJS, MongoDB, HTML, CSS, and Bootstrap. The site allows users to create, view, and manage blog posts, with user authentication for added functionality.

## Features

- User Authentication (Login and Signup)
- Create, View, and Manage Blog Posts
- About Page with Developer Information
- Responsive Design using Bootstrap

## Tech Stack

- Node.js
- Express.js
- EJS (Embedded JavaScript templates)
- HTML
- CSS
- MongoDB
- Mongoose

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).


### Installation

To run this project locally, follow these steps:

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-username/blogsite_project.git
   cd blogsite_project
    ```
2. **Install Dependencies:**
 Make sure you have Node.js and MongoDB installed on your machine.
    ```sh
   npm install
     ```
3. **Create a .env file in the root directory and add the following environment variables:**
  ```plaintext

 MONGODB_URI=mongodb+srv://<username>: <password>@cluster0.mongodb.net/blogsite?retryWrites=true&w=majority
SESSION_SECRET=your_secret_key
  ```
4. **Start MongoDB:**
Ensure that your MongoDB server is running. You can start it with the following command if you have MongoDB installed locally:
     ```bash
    mongod
5. **Run the Application:**
   ```bash
   node app.js

6. **Open in Browser:**
Open your browser and go to http://localhost:3000 to see the blog site in action.

## Project Structure
blogsite_project
│   app.js
│   package.json
│   .env
|   README.md
│   .gitignore
|
├───public
│   |└───css
│   |   └───styles.css
│   |
|   |____images
|  
├───views
│   ├───about.ejs
│   ├───compose.ejs
│   ├───home.ejs
│   ├───layout.ejs
│   ├───login.ejs
│   ├───post.ejs
│   ├───posts.ejs
│   └───signup.ejs


## Technologies Used
1. Backend: Node.js, Express.js, MongoDB, Mongoose
2. Frontend: EJS, HTML, CSS, Bootstrap
3. Authentication: express-session, bcrypt

## Developer Information
This project was developed by Aditya Mishra. Feel free to reach out if you have any questions or suggestions!

1. Email: adityamishra.me@gmail.com
2. LinkedIn: https://www.linkedin.com/in/aditya-mishra-6k/
3. GitHub: https://github.com/aditya2131

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

