# Order Management App

A full-stack food ordering system built with **Next.js App Router**, **Prisma**, **MongoDB**, and **Tailwind CSS**.

This application supports complete menu management, cart handling, and order processing with admin controls and automated test coverage.

---

## 📁 Project Structure

raftLabs-main/
├─ app/ # App Router (pages + API routes)
│ ├─ api/ # REST API routes (menu, orders, featured)
│ ├─ admin/ # Admin dashboard
│ ├─ cart/ # Cart page
│ ├─ menu/ # Menu listing
│ ├─ orders/ # Orders overview
│ └─ order/[id]/ # Single order view
│
├─ components/ # Reusable UI & feature components
│ ├─ admin/ # Admin forms & tables
│ ├─ cart/ # Cart UI components
│ ├─ menu/ # Menu display components
│ └─ ui/ # Shared UI components
│
├─ context/ # React context (Cart state management)
├─ lib/ # Prisma client & shared types
├─ prisma/ # Prisma schema & seed data
├─ tests/ # API + UI test cases
├─ public/ # Static assets
└─ config files # Next.js, Jest, ESLint, Tailwind, TS

---

## 🚀 Features

### User Side

- Browse full menu
- View featured items
- Add/remove items from cart
- Quantity-based ordering
- Checkout form validation
- Place orders
- View order details

### Admin Dashboard

- Create menu items
- Edit menu items
- Delete menu items
- View all orders
- Update order status

### Order Management

- Multi-item order support
- Dynamic total calculation
- Order status tracking
- Dedicated order detail page

### Testing

- API route tests
- UI component tests
- CRUD flow coverage
- Checkout validation tests

---

## 📡 API Routes

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/menu`         | Get all menu items     |
| POST   | `/api/menu`         | Create menu item       |
| GET    | `/api/menu/[id]`    | Get single menu item   |
| PUT    | `/api/menu/[id]`    | Update menu item       |
| DELETE | `/api/menu/[id]`    | Delete menu item       |
| GET    | `/api/orders`       | Get all orders         |
| POST   | `/api/orders`       | Create order           |
| GET    | `/api/orders/[id]`  | Get order by ID        |
| GET    | `/api/orders/all`   | Admin fetch all orders |
| GET    | `/api/FeaturedMenu` | Fetch featured items   |

---

## 🛠 Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Context API (Cart State)

### Backend

- Next.js Route Handlers
- Prisma ORM
- MongoDB

### Testing

- Jest
- React Testing Library

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

DATABASE_URL="your-mongodb-connection-string"

---

## 🖥 Running Locally

### 1️⃣ Install Dependencies

```bash
npm install
2️⃣ Setup Database
npx prisma generate
npx prisma db push
npx prisma db seed
3️⃣ Start Development Server
npm run dev
4️⃣ Run Tests
npm test
🗄 Database Schema Overview
Menu

id

name

description

price

category

isFeatured

Order

id

items

totalAmount

status

createdAt

📜 Scripts
Command	Description
npm run dev	Start development server
npm run build	Build for production
npm run start	Start production server
npm test	Run test suite
npm run test:watch	Run tests in watch mode
🔮 Future Improvements

Authentication (Admin role protection)

Payment gateway integration

Pagination & filtering

Order analytics dashboard

Deployment setup (Vercel)

📄 License

This project is for educational and development purposes.
```
