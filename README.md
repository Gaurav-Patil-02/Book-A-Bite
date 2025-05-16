# Book a Bite 🍽️

**Book a Bite** is a full-stack restaurant reservation system built with the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). This application allows users to discover restaurants, view available time slots, and book tables online in real-time.

---

## 🚀 Features

- 🔐 User Authentication using JWT
- 📅 Table reservation with date and time selection
- 🏨 Restaurant listing and details page
- 💻 Fully responsive design with modern UI

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Token (JWT)
- **Database**: MongoDB Atlas

---

## 📁 Folder Structure

```
Book-a-Bite/
├── frontend/       # React Frontend
├── backend/        # Node.js + Express Backend
├── .env.example        # Sample env file
├── README.md
```

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Gaurav-Patil-02/Book-A-Bite.git
cd book-a-bite
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in your MongoDB URI and JWT secret
npm start
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## 📄 Environment Variables

Create your `.env` file in the `backend` folder using this format:

```env
PORT=5000
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_secret_key_here
```

