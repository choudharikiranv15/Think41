# Product Catalog - Full Stack E-commerce Application

A modern, full-stack product catalog application built with Node.js, Express, SQLite, React, and Material UI. This project demonstrates database normalization, REST API development, and responsive frontend design with department-based filtering and pagination.

## 🚀 Project Overview

This e-commerce prototype showcases a complete product catalog system where users can browse products across different departments (Men, Women) with advanced filtering, pagination, and detailed product views. The application features a normalized database schema and clean, modern UI built with Material UI.

## ✨ Key Features

### Backend Features

- **RESTful API** with Express.js
- **SQLite Database** with normalized schema
- **Department Normalization** - Separate departments table with foreign key relationships
- **Pagination Support** - Efficient data loading with limit/offset
- **Error Handling** - Comprehensive error responses with appropriate HTTP status codes
- **Foreign Key Constraints** - Data integrity enforcement

### Frontend Features

- **Material UI Components** - Modern, responsive design
- **Department Tabs** - Filter products by "All Departments", "Men", "Women"
- **Responsive Grid Layout** - Product cards adapt to screen sizes
- **Pagination Controls** - Previous/Next navigation with page numbers
- **Product Detail Views** - Detailed product information pages
- **Loading States** - Smooth user experience with loading indicators

### Database Features

- **Normalized Schema** - Departments and products with proper relationships
- **Foreign Key References** - `department_id` linking products to departments
- **Data Integrity** - Constraints and validation at database level
- **Migration Support** - Scripts for schema updates and data migration

## 🛠 Technology Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **SQLite** - Lightweight database
- **sqlite3** - Node.js SQLite driver

### Frontend

- **React** - JavaScript library for building user interfaces
- **Material UI (@mui/material)** - React component library
- **React Router** - Client-side routing
- **JavaScript (ES6+)** - Modern JavaScript features

### Development Tools

- **DB Browser for SQLite** - Database management tool
- **npm** - Package manager
- **Git** - Version control

## 📁 Project Structure

```
product-catalog/
├── backend/
│   ├── routes/
│   │   ├── departments.js     # Department API endpoints
│   │   └── products.js        # Product API endpoints
│   ├── db.js                  # Database connection & schema
│   ├── index.js              # Express server entry point
│   └── seed.js               # Sample data insertion
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main application component
│   │   ├── ProductList.js    # Product listing with tabs & pagination
│   │   └── ProductDetail.js  # Individual product details
│   └── package.json
├── think41.db                # SQLite database file
├── package.json              # Backend dependencies
└── README.md                 # This file
```

## 🗄 Database Schema

### Departments Table

```sql
CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);
```

### Products Table

```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    cost REAL,
    category TEXT,
    name TEXT,
    brand TEXT,
    retail_price REAL,
    department TEXT,          -- Legacy field (deprecated)
    sku TEXT,
    distribution_center_id INTEGER,
    department_id INTEGER,    -- Foreign key to departments.id
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

## 🌐 API Endpoints

### Departments API

| Method | Endpoint                        | Description                              | Parameters                                                               |
| ------ | ------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------ |
| GET    | `/api/departments`              | List all departments with product counts | None                                                                     |
| GET    | `/api/departments/:id`          | Get specific department details          | `id` - Department ID                                                     |
| GET    | `/api/departments/:id/products` | Get products for a department            | `id` - Department ID<br>`limit` - Items per page<br>`page` - Page number |

### Products API

| Method | Endpoint            | Description                       | Parameters                                       |
| ------ | ------------------- | --------------------------------- | ------------------------------------------------ |
| GET    | `/api/products`     | List all products with pagination | `limit` - Items per page<br>`page` - Page number |
| GET    | `/api/products/:id` | Get specific product details      | `id` - Product ID                                |

### Sample API Responses

**GET /api/departments**

```json
{
  "departments": [
    { "id": 1, "name": "Men", "product_count": 25 },
    { "id": 2, "name": "Women", "product_count": 30 }
  ]
}
```

**GET /api/products**

```json
{
  "products": [
    {
      "id": 1,
      "name": "Men's T-Shirt",
      "brand": "BrandX",
      "retail_price": 19.99,
      "department_name": "Men"
    }
  ],
  "pagination": {
    "total": 55,
    "page": 1,
    "limit": 12,
    "totalPages": 5
  }
}
```

## 🏁 Milestones Completed

### Milestone 4: Department Normalization

- ✅ Created separate `departments` table
- ✅ Added `department_id` foreign key to products
- ✅ Migrated existing department data
- ✅ Updated API endpoints to use JOINs

### Milestone 5: Departments API

- ✅ Implemented `/api/departments` endpoint
- ✅ Added `/api/departments/:id` for individual departments
- ✅ Created `/api/departments/:id/products` for filtered products
- ✅ Added pagination support to all endpoints

### Milestone 6: Frontend Department Filtering

- ✅ Built Material UI tabs for department navigation
- ✅ Implemented client-side filtering by department
- ✅ Added responsive product grid layout
- ✅ Integrated pagination controls

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation & Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd product-catalog
```

2. **Install backend dependencies**

```bash
npm install
```

3. **Install frontend dependencies**

```bash
cd frontend
npm install
cd ..
```

4. **Initialize database with sample data**

```bash
node seed.js
```

5. **Start the backend server**

```bash
node index.js
```

6. **Start the frontend (in a new terminal)**

```bash
cd frontend
npm start
```

7. **Access the application**

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

## 💻 Usage Guide

### Browsing Products

1. Open the application in your browser
2. Use the tabs at the top to filter by department:
   - **All Departments** - Shows all products
   - **Men** - Shows only men's products
   - **Women** - Shows only women's products
3. Navigate through pages using Previous/Next buttons
4. Click "View Details" on any product card for detailed information

### API Usage

```bash
# Get all departments
curl http://localhost:3000/api/departments

# Get men's products (department ID 1)
curl http://localhost:3000/api/departments/1/products?limit=10&page=1

# Get paginated products
curl http://localhost:3000/api/products?limit=12&page=2
```

## 🐛 Troubleshooting

### Common Issues

**API endpoints hanging/not responding:**

- Ensure DB Browser for SQLite is completely closed
- Restart the Node.js server
- Check that `think41.db` file exists and is not corrupted

**Frontend tabs not showing Men/Women:**

- Verify `/api/departments` returns correct data
- Check that department names in database are exactly "Men" and "Women"
- Clear browser cache and reload

**Database connection errors:**

- Ensure only one application accesses the SQLite file at a time
- Verify file permissions on `think41.db`
- Try deleting the database file and running `node seed.js` again

## 🔮 Future Enhancements

- **Search Functionality** - Product search by name, brand, or category
- **Advanced Filtering** - Price range, brand, category filters
- **Product Images** - Image upload and display capabilities
- **User Authentication** - Login/logout functionality
- **Shopping Cart** - Add to cart and checkout features
- **Admin Panel** - CRUD operations for products and departments
- **Deployment** - Production deployment with Docker/cloud services

## 📝 Development Notes

- **Database Migrations**: Use `seed.js` to reset and populate database
- **API Testing**: Use Postman or curl for endpoint testing
- **Frontend Development**: React dev server proxies API calls to backend
- **Error Handling**: All API endpoints return consistent JSON error responses
- **Code Style**: ES6+ features, async/await patterns, Material UI best practices

## 📄 License

MIT License - feel free to use this project for learning and development purposes.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📞 Support

For questions, issues, or contributions, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using Node.js, React, and Material UI**
