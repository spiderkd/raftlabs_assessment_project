<!-- # Order Management App

A full-stack food ordering system built with **Next.js App Router**, **Prisma**, **MongoDB**, and **Tailwind CSS**.

This application supports complete menu management, cart handling, and order processing with admin controls and automated test coverage.

---

## 📁 Project Structure

```bash
raftLabs-main/
├── app/
│   ├── admin/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── api/
│   │   ├── FeaturedMenu/
│   │   │   └── route.ts
│   │   ├── menu/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── orders/
│   │       ├── [id]/
│   │       │   └── route.ts
│   │       ├── all/
│   │       │   └── route.ts
│   │       └── route.ts
│   ├── cart/
│   │   └── page.tsx
│   ├── menu/
│   │   └── page.tsx
│   ├── orders/
│   │   └── page.tsx
│   ├── order/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── admin/
│   ├── cart/
│   ├── menu/
│   └── ui/
│
├── context/
│   └── CartContext.tsx
│
├── lib/
│   ├── prisma.ts
│   └── types.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── __tests__/
│   ├── api/
│   └── ui/
│
├── public/
├── .env
├── jest.config.js
├── next.config.ts
├── tsconfig.json
└── package.json -->

# 🍽 Order Management App

### RaftLabs Technical Assessment Submission

This project was developed as part of the **RaftLabs Full-Stack Developer Technical Assessment**.

It is a production-structured food ordering system built using **Next.js (App Router)**, **Prisma ORM**, **MongoDB**, and **Tailwind CSS**, with full API and UI test coverage.

The objective of this assessment was to demonstrate:

- Clean folder architecture using App Router
- RESTful API design with route handlers
- Database modeling with Prisma
- State management using Context API
- Admin & user workflow separation
- Testing practices (API + UI)

---

## 🚀 Project Overview

The application simulates a real-world food ordering platform that supports:

- Customer-side ordering flow
- Admin-side management dashboard
- Multi-item cart system
- Order lifecycle tracking
- Automated test coverage

The structure follows scalable production-level conventions.

---

## 📁 Project Structure

```bash
raftLabs-main/
├── app/
│   ├── admin/
│   ├── api/
│   │   ├── FeaturedMenu/
│   │   ├── menu/
│   │   └── orders/
│   ├── cart/
│   ├── menu/
│   ├── orders/
│   ├── order/[id]/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── admin/
│   ├── cart/
│   ├── menu/
│   └── ui/
│
├── context/
│   └── CartContext.tsx
│
├── lib/
│   ├── prisma.ts
│   └── types.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── __tests__/
│   ├── api/
│   └── ui/
│
├── public/
├── .env
├── jest.config.js
├── next.config.ts
├── tsconfig.json
└── package.json
```

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
| PUT    | `/api/menu/[id]`    | Update menu item       |
| DELETE | `/api/menu/[id]`    | Delete menu item       |
| GET    | `/api/orders`       | Get all orders         |
| POST   | `/api/orders`       | Create order           |
| DELETE | `/api/orders/[id]`  | Delete order by ID     |
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

1️⃣ Create Environment File

Create a `.env` file in the root directory and add:

```env
DATABASE_URL="your-mongodb-connection-string"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

2️⃣ Install Dependencies

```bash
npm install
```

3️⃣ Setup Database

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

4️⃣ Start Development Server

```bash
npm run dev
```

5️⃣ Run Tests

```bash
npm test
```

## 🗄 Database Schema Overview

This project uses **MongoDB** with **Prisma ORM**.  
Below is the actual schema structure used in the application.

---

### 📦 MenuItem Model

Represents food items available for ordering.

| Field         | Type            | Description                    |
| ------------- | --------------- | ------------------------------ |
| `id`          | String          | MongoDB ObjectId (Primary Key) |
| `name`        | String          | Name of the dish               |
| `description` | String          | Description of the item        |
| `price`       | Int             | Price of the item              |
| `image`       | String          | Image URL of the item          |
| `category`    | Category (Enum) | Food category                  |
| `isFeatured`  | Boolean         | Whether item is featured       |
| `createdAt`   | DateTime        | Timestamp of creation          |

---

### 🧾 Order Model

Represents a customer order.

| Field       | Type     | Description                    |
| ----------- | -------- | ------------------------------ |
| `id`        | String   | MongoDB ObjectId (Primary Key) |
| `name`      | String   | Customer name                  |
| `address`   | String   | Delivery address               |
| `phone`     | String   | Customer phone number          |
| `status`    | String   | Current order status           |
| `items`     | Json     | Array of ordered items         |
| `createdAt` | DateTime | Order creation timestamp       |

Default status:Order Received

---

### 🛒 OrderItem Type (Stored Inside Order.items)

Each order stores its items as JSON using the following structure:

| Field      | Type   | Description                |
| ---------- | ------ | -------------------------- |
| `id`       | String | Menu item ID               |
| `name`     | String | Item name at time of order |
| `price`    | Float  | Item price at order time   |
| `quantity` | Int    | Quantity ordered           |

This ensures historical price integrity even if menu prices change later.

---

### 📚 Category Enum

Defines allowed menu categories:

- STARTER
- MAIN_COURSE
- SEAFOOD
- PASTA
- SALAD
- DESSERT
- BEVERAGE

---

### 🚚 OrderStatus Enum

Defined possible order states:

- ORDER_RECEIVED
- PREPARING
- OUT_FOR_DELIVERY
- DELIVERED

(Note: Current implementation stores status as String, but enum is defined for structured control.)

---

### 🔗 Data Relationships

- One **Order** contains multiple **MenuItems**
- Order items are stored as JSON snapshots
- Menu items are categorized using enums

---

📄 License

This project is for educational and development purposes.
