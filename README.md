<<<<<<< HEAD
# ecoswap-account-orders
=======
# Account & Orders Microfrontend (`account-orders-mf`)

![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)
![Material UI](https://img.shields.io/badge/Material--UI-9.0-007FFF?logo=mui)
![Microfrontend](https://img.shields.io/badge/Architecture-Microfrontend-green)

A independent, production-ready **Account & Orders Microfrontend** built for the **EcoSwap E-commerce Platform**. It owns all user authentication, profile management, order history tracking, wishlist management, and product reviews.

---

## 🚀 Key Features

* **🔐 Authentication System**: Clean Login & Register forms with input validation, local session persistence, and cross-MFE login event broadcasting.
* **👤 User Profile Management**: Interactive user profile with editable bio, address, phone number, sustainability badge, and activity metrics.
* **📦 Order History & Tracking**: Filterable order list (Processing, Delivered, Cancelled) featuring interactive delivery timeline steppers, item breakdowns, total costs, and reordering.
* **❤️ Wishlist & Saved Items**: Grid view of saved items with stock indicators, discount badges, and a **"Move to Cart"** trigger that communicates directly with the Cart Microfrontend.
* **⭐ Product Reviews**: User ratings overview, verified purchase badges, and a modal dialog to publish new product feedback.
* **🔌 Microfrontend Ready**: Built-in Event Bus and Vite Module Federation support for seamless integration into a Shell Host app.

---

## 🛠️ Tech Stack

* **Framework**: React 19 + Vite
* **UI Library**: Material UI (MUI v9) with Custom Material Design Theme
* **Routing**: React Router DOM v7
* **Icons**: `@mui/icons-material`
* **Microfrontend Integration**: `@originjs/vite-plugin-federation` & Native `CustomEvent` Bus

---

## 🌐 Exposed Microfrontend Routes

When mounted inside the Shell or accessed directly, this MFE provides the following routes:

| Route Path | Description |
| :--- | :--- |
| `/` | Login Page (or Shell default entry) |
| `/register` | User Registration Form |
| `/profile` | User Profile & Activity Dashboard |
| `/orders` | Order History & Shipment Stepper |
| `/wishlist` | Saved Wishlist Items & Stock Status |
| `/reviews` | User Reviews & Rating Submission Modal |

---

## 📡 Exposed & Listened Custom Events (Event Bus)

The application communicates with the **Shell** and sibling microfrontends (Catalog & Cart) via `CustomEvent` objects dispatched on `window`:

| Event Name | Type | Payload / Detail | Trigger Condition |
| :--- | :---: | :--- | :--- |
| `ecoswap:user-login` | Emitted | `{ user, timestamp }` | Dispatched when user logs in successfully |
| `ecoswap:user-logout` | Emitted | `{ timestamp }` | Dispatched when user signs out |
| `ecoswap:user-register` | Emitted | `{ user, timestamp }` | Dispatched when new user registers |
| `ecoswap:add-to-cart` | Emitted | `{ productId, title, price, image, quantity }` | Dispatched when user clicks "Move to Cart" in Wishlist (consumed by Cart MFE) |
| `ecoswap:wishlist-updated` | Emitted | `{ items, count }` | Dispatched when wishlist items change |
| `ecoswap:profile-updated` | Emitted | `{ user }` | Dispatched when profile details are updated |

---

## 🔗 Shell Integration Guide

### Method 1: Vite / Webpack Module Federation (Recommended)
This MFE exposes the following entry points via Module Federation on port `5003`:

* **Remote Entry URL**: `http://localhost:5003/assets/remoteEntry.js` (or live deployed URL)
* **Exposed Modules**:
  * `./AccountApp` -> `./src/App.jsx`
  * `./AppRoutes` -> `./src/routes/AppRoutes.jsx`
  * `./eventBus` -> `./src/services/eventBus.js`

**Example Shell Configuration (`vite.config.js` in Shell App):**
```js
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'shellApp',
      remotes: {
        accountOrdersMFE: 'http://localhost:5003/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@mui/material'],
    }),
  ],
});
```

### Method 2: iframe Composition
Embed the live deployed URL of this microfrontend inside the Shell:
```html
<iframe src="https://your-account-orders-mfe.vercel.app/profile" width="100%" height="800px" frameborder="0"></iframe>
```

---

## ⚙️ Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tasneemjber/junit5-HW.git
   cd account-orders-mf
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the indicated port) in your browser.

4. **Build for production & preview MFE bundle**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📄 License
This project is part of the E-commerce Microfrontend course assignment. Free for educational use.
>>>>>>> d3b38a4 (Initial account and orders microfrontend)
