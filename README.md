# MERN Books Library App

A full-stack web application for managing a book library built with MongoDB, Express.js, React.js, and Node.js.

## 🚀 Features

- **Add Books**: Create new book entries with title, author, ISBN, genre, and description
- **View Books**: Display all books in an attractive grid layout
- **Delete Books**: Remove books from the library
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Automatic refresh after adding/deleting books

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **Git** - [Download here](https://git-scm.com/)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd mern-books-app
```

### 2. Install Dependencies

Install root dependencies (concurrently):
```bash
npm install
```

Install server dependencies:
```bash
npm run install-server
```

Install client dependencies:
```bash
npm run install-client
```

Or install all at once:
```bash
npm run install-all
```

### 3. Setup MongoDB

**Option A: Local MongoDB**
1. Install MongoDB on your machine
2. Start MongoDB service:
   - Windows: `net start MongoDB`
   - macOS: `brew services start mongodb/brew/mongodb-community`
   - Linux: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGO_URI` in `/server/.env`

### 4. Environment Variables

Update `/server/.env` file:
```env
MONGO_URI=mongodb://localhost:27017/mern-books-db
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas, use:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mern-books-db?retryWrites=true&w=majority
```

## 🏃‍♂️ Running the Application

### Development Mode (Recommended)

Run both frontend and backend simultaneously:
```bash
npm start
```

This will start:
- **Backend server** on `http://localhost:5000`
- **React frontend** on `http://localhost:3000`

### Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## 📁 Project Structure

```
mern-books-app/
├── client/                 # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   └── Home.js     # Main component
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css       # Styles
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/
│   │   └── Book.js         # MongoDB schema
│   ├── routes/
│   │   └── books.js        # API routes
│   ├── index.js            # Server entry point
│   ├── .env                # Environment variables
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get a specific book |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

## 📚 Book Schema

```javascript
{
  title: String (required),
  author: String (required),
  isbn: String (unique),
  publishedYear: Number,
  genre: String,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Technologies Used

### Frontend
- **React.js** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling with responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Development Tools
- **Concurrently** - Run multiple scripts
- **Nodemon** - Auto-restart server
- **CORS** - Cross-origin resource sharing

## 🚨 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running on your machine.

**2. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process using port 5000 or change the port in `.env`.

**3. Module Not Found**
**Solution:** Make sure you've installed all dependencies:
```bash
npm run install-all
```

**4. Proxy Error**
**Solution:** Ensure the backend server is running on port 5000.

### Debug Mode

Run the server in debug mode:
```bash
cd server
npm run dev
```

## 📝 Future Enhancements

- [ ] User authentication and authorization
- [ ] Book categories and tags
- [ ] Search and filter functionality
- [ ] Book cover image uploads
- [ ] Reading progress tracking
- [ ] Book reviews and ratings
- [ ] Export to CSV/PDF
- [ ] Dark mode theme

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section
2. Look at existing GitHub issues
3. Create a new issue with detailed information

---

**Happy coding! 📚✨**