# Music Playlist Manager API
A RESTful API for managing users, playlists, and songs. Built with Node.js, Express, and MongoDB, this project allows users to register, log in, create playlists, and add songs to their playlists securely.

## Project Structure
├── controllers/
│   ├── auth.controller.js       
│   └── playlist.controller.js   

├── models/
│   ├── user.model.js            
│   └── playlist.model.js        

├── routes/
│   ├── auth.routes.js           
│   └── playlist.routes.js       

├── middleware/
│   └── auth.middleware.js       

├── config/
│   └── db.js                    

├── .env                        
├── app.js                       
└── server.js                    

## Getting Started
Clone the repository
git clone https://github.com/your-username/group3-music-playlist-manager.git
cd group3-music-playlist-manager
Configure environment variables Create a .env file in the root directory with the following: PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/db_name
JWT_SECRET=your_jwt_secret
Start the server For development npm run dev
For production npm start The server will run on http://localhost:5000

## API Endpoints
 Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and receive token

# Use the token in headers:
Authorization: Bearer <your_token>

### Playlist Endpoints 

| Method | Endpoint                       | Description                      |
|--------|--------------------------------|----------------------------------|
| POST   | /api/playlists                 | Create a new playlist            |
| GET    | /api/playlists                 | Get all playlists for user       |
| GET    | /api/playlists/:id             | Get specific playlist by ID      |
| POST   | /api/playlists/:id/songs       | Add song to a playlist           |
| PUT    | /api/playlists/:id             | Update playlist details          |
| DELETE | /api/playlists/:id             | Delete playlist                  |


# Example Usage (Postman)
Use POST /api/auth/register to create an account

Log in via POST /api/auth/login to receive a token

Include the token in Authorization header to create and manage playlists

## Testing
we  used Postman to test endpoints. 




