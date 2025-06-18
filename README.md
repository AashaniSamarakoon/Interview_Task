# Product Management System

A modern full-stack web application for managing products with user authentication and CRUD operations.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Product Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Image Upload**: Support for product images with base64 encoding
- **Category Management**: Organize products by categories
- **Responsive Design**: Modern UI with Tailwind CSS
- **Form Validation**: Client and server-side validation
- **Security**: Rate limiting, CORS, and security headers

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Helmet** - Security middleware

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AashaniSamarakoon/Interview_Task.git
   cd Interview_Task
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment files
   cp .env.example .env
   cp backend/.env.example backend/.env
   ```

4. **Configure Environment Variables**
   
   **Frontend (.env):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=Product Management App
   ```
   
   **Backend (backend/.env):**
   ```env
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=24h
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

### Production Mode

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the backend**
   ```bash
   cd backend
   npm start
   ```

## 📚 API Documentation

See [API Documentation](./docs/API.md) for detailed API endpoints and usage.

## 🏗️ Project Structure

```
project-root/
├── src/                    # Frontend source code
│   ├── utils/             # Utility functions
│   ├── assets/            # Static assets
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── backend/               # Backend source code
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── uploads/          # File upload directory
│   └── server.js         # Server entry point
├── docs/                 # Documentation
├── public/               # Public assets
└── package.json          # Project configuration
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- CORS configuration
- Security headers with Helmet
- Input validation and sanitization

## 📱 Demo Credentials

For testing purposes, you can use:
- **Email**: admin@example.com
- **Password**: password

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing library
- Express.js community
- Tailwind CSS for the utility-first CSS framework
- All contributors who helped make this project better

## 🐛 Issues

If you encounter any issues, please file them in the [Issues](https://github.com/AashaniSamarakoon/Product_Managment/issues) section.

## 📞 Support

For support, email [support@productmanagement.com](mailto:support@productmanagement.com) or join our community discussions.
