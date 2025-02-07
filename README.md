# **Music App**

## 📝 **Introduction**

This project is a Music Streaming Application built using Server-Side Rendering (SSR) with TypeScript. It utilizes MongoDB for database storage and PUG for rendering the user interface. The framework used is ExpressJS, combined with various NPM libraries. The system includes admin management and a music player for users.

## 📌 Features

🔹 Admin Panel

- Manage Music Categories:

  - Category Name

  - Cover Image

  - Short Description

- Manage Songs:

  - Song Title

  - Cover Image

  - Artist

  - Upload Date

  - Audio File

  - Number of Likes

  - Add to Favorite Songs

  - Lyrics

🔹 Client-Side Features

- Music Categories Page:

  - Display all music categories

  - Category name, cover image, short description

- Song List Page:

  - Display songs with title, cover image, artist, upload date, number of likes

- Song Details Page:

  - Song title, cover image, artist, upload date

  - Play button

  - Number of likes

  - Add to favorite songs

  - Lyrics

  - Short description

- Search Results Page:

  - Display matching songs with title, cover image, artist, upload date

- Favorite Songs Page:

  - Display all favorited songs with title, cover image, artist, upload date

## ⚙️ **Installation and Setup**

📌 **Prerequisites**

Ensure you have the following installed:

- Node.js (Latest LTS version recommended)

- MongoDB Atlas (or local MongoDB instance)

- Git

📌 **Clone Repository**

git clone https://github.com/tuyenmon2201/music-app-ts.git
cd music-app-ts

📌 **Install Dependencies**

npm install

📌 **Environment Configuration**

Create a .env file in the root directory and configure the following variables:

- PORT=3000
- MONGODB_URI=your_mongodb_connection_string
- SESSION_SECRET=your_secret_key

📌 **Start the Application**

🔹 Development Mode

npm run dev

🔹 Production Mode

npm start

📌 **Access the Application**

Open http://localhost:3000/ in your browser.

🛠️ **Technologies Used**

- ExpressJS - Web framework for Node.js

- MongoDB - Database storage

- PUG - Template engine for UI rendering

- Mongoose - ODM for MongoDB

- BcryptJS - Password hashing

- Dotenv - Environment variable management

🤝 **Contributing**

1. Fork the repository.

2. Create a new branch: git checkout -b feature-name

3. Commit your changes: git commit -m "Add some feature"

4. Push to the branch: git push origin feature-name

5. Submit a Pull Request.