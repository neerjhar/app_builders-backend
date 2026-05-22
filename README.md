# 🏟️ Turf Booking App — Backend API

A Node.js + Express + MongoDB backend for discovering and booking cricket/football turfs in Kolkata. Supports turf listing, search, nearby turf discovery (geospatial), and payments via Razorpay.

---

## 📁 Project Structure

```
appbuilders/
├── backend/
│   ├── data/
│   │   └── turfs.json          # Sample turf data
│   ├── models/
│   │   └── Truf.js             # Mongoose schema for Turf
│   ├── routes/
│   │   ├── turfRoutes.js       # Turf CRUD + search + nearby routes
│   │   └── bookingRoutes.js    # Razorpay order + payment verification
│   ├── .env                    # Environment variables (not committed)
│   └── server.js               # Express app entry point
├── node_modules/
├── package.json
└── package-lock.json
```

---

## ⚙️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Runtime    | Node.js v24                       |
| Framework  | Express.js                        |
| Database   | MongoDB (local via Compass)       |
| ODM        | Mongoose                          |
| Payments   | Razorpay                          |
| Config     | dotenv                            |
| Dev Tool   | nodemon                           |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd appbuilders
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file inside the `backend/` folder:

```env
MONGO_URI=mongodb://localhost:27017/admin
PORT=5000
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxx
```

> 💡 Get your Razorpay test keys from [razorpay.com](https://razorpay.com) → Dashboard → Settings → API Keys

### 4. Start MongoDB

Make sure MongoDB is running locally. You can use [MongoDB Compass](https://www.mongodb.com/products/compass) to manage your data visually.

### 5. Run the server

```bash
cd backend
node server.js
```

You should see:
```
Server running on 5000
MongoDB Connected
```

---

## 📡 API Endpoints

### Turf Routes — `/api/turfs`

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| GET    | `/api/turfs`          | Get all turfs                      |
| GET    | `/api/turfs/search?q=` | Search turfs by name or location  |
| GET    | `/api/turfs/nearby?lat=&lng=&km=` | Find turfs near a location |

#### Example — Search
```
GET http://localhost:5000/api/turfs/search?q=Kolkata
```

#### Example — Nearby (within 5km of Kolkata city center)
```
GET http://localhost:5000/api/turfs/nearby?lat=22.5726&lng=88.3639&km=5
```

---

### Booking Routes — `/api/booking`

| Method | Endpoint                        | Description                      |
|--------|---------------------------------|----------------------------------|
| POST   | `/api/booking/create-order`     | Create a Razorpay payment order  |
| POST   | `/api/booking/verify-payment`   | Verify payment signature         |

#### Example — Create Order (request body)
```json
{
  "amount": 1200,
  "turfId": "6a108b08ad97892e207fefe9",
  "turfName": "Turf XL",
  "slot": "6:00 AM - 7:00 AM"
}
```

#### Example — Verify Payment (request body)
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx"
}
```

---

## 🗄️ Database

- **Database:** `admin`
- **Collection:** `turffdata`
- **Tool:** MongoDB Compass (local)

### Turf Document Structure

```json
{
  "_id": "ObjectId",
  "turfName": "Turf XL",
  "turfLocation": "48, SN Roy Rd, New Alipore, Kolkata",
  "turfReview": 4.4,
  "turfStatus": "Active",
  "turfHours": "06:00 AM - 12:00 AM",
  "turfFees": "₹1200/hour",
  "googleMapsLink": "https://maps.google.com/...",
  "location": {
    "type": "Point",
    "coordinates": [88.3229, 22.5195]
  }
}
```

> ⚠️ The `location` field with `[longitude, latitude]` coordinates is required for the nearby search feature.

---

## 💳 Payment Flow (Razorpay)

```
User clicks "Book Now"
        ↓
Frontend calls POST /api/booking/create-order
        ↓
Backend creates Razorpay order → returns orderId
        ↓
Razorpay checkout popup opens in browser
        ↓
User completes payment
        ↓
Frontend calls POST /api/booking/verify-payment
        ↓
Backend verifies HMAC signature → confirms booking
```

---

## 🌍 Nearby Search Setup

To enable geospatial search, each turf document must have a `location` field:

```json
"location": {
  "type": "Point",
  "coordinates": [longitude, latitude]
}
```

The model automatically creates a `2dsphere` index on this field for fast geo queries.

---

## 🛠️ Common Issues & Fixes

| Problem | Fix |
|--------|-----|
| `Cannot find module './routes/turfRoutes'` | Make sure you're running `node server.js` from inside the `backend/` folder |
| `command not found: nodemon` | Run `npm install -g nodemon` |
| `MongoDB ENOTFOUND` | Check your `MONGO_URI` in `.env` — use `mongodb://localhost:27017/admin` for local |
| Brave browser blocks localhost | Disable Brave Shields or use Safari/Chrome |
| `argument handler must be a function` | Check model filename — it's `Truf.js` not `Turf.js` |

---

## 📦 Dependencies

```json
{
  "express": "^4.x",
  "mongoose": "^7.x",
  "cors": "^2.x",
  "dotenv": "^16.x",
  "razorpay": "^2.x"
}
```

Install all with:
```bash
npm install
```

---

## 👨‍💻 Author

Built by **Neerjhar** — a turf discovery and booking platform for Kolkata.

---

## 📄 License

MIT License — free to use and modify.