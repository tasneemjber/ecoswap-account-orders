# Account & Orders Microfrontend

An independent **Account & Orders Microfrontend** built for the **EcoSwap E-commerce Platform**.

This component is responsible for user authentication, profile management, order history, wishlist management, and product reviews.

---

## 🚀 Features

* 🔐 **Authentication**

  * Login
  * Registration
  * User session handling

* 👤 **Profile Management**

  * View and manage user profile information
  * Personal information and activity details

* 📦 **Order History**

  * View previous orders
  * Order status and tracking information

* ❤️ **Wishlist**

  * View saved products
  * Move wishlist products to cart

* ⭐ **Product Reviews**

  * View user reviews
  * Submit product ratings and reviews

* 🔌 **Microfrontend Integration**

  * Vite Module Federation
  * Custom Event Bus for communication with the Shell and other microfrontends

---

## 🛠️ Tech Stack

* **Framework:** React 19
* **Build Tool:** Vite 8
* **UI Library:** Material UI (MUI) 9
* **Routing:** React Router DOM 7
* **Icons:** MUI Icons
* **Microfrontend:** Vite Module Federation
* **Communication:** Native `CustomEvent` Event Bus

---

## 🌐 Routes

| Route       | Description       |
| ----------- | ----------------- |
| `/`         | Login             |
| `/register` | User Registration |
| `/profile`  | User Profile      |
| `/orders`   | Order History     |
| `/wishlist` | Wishlist          |
| `/reviews`  | Product Reviews   |

Any unknown route is redirected to `/`.

---

## 📡 Microfrontend Events

The Account & Orders MFE communicates with the Shell and other microfrontends through browser `CustomEvent`s.

| Event                      | Type    | Purpose                                              |
| -------------------------- | ------- | ---------------------------------------------------- |
| `ecoswap:user-login`       | Emitted | Notifies the system after a successful login         |
| `ecoswap:user-logout`      | Emitted | Notifies the system when the user logs out           |
| `ecoswap:user-register`    | Emitted | Notifies the system after registration               |
| `ecoswap:add-to-cart`      | Emitted | Sends a wishlist product to the Cart MFE             |
| `ecoswap:wishlist-updated` | Emitted | Notifies the system when wishlist data changes       |
| `ecoswap:profile-updated`  | Emitted | Notifies the system when profile information changes |

---

## 🔗 Module Federation

The microfrontend is configured using `@originjs/vite-plugin-federation`.

### MFE Name

```text
accountOrdersMFE
```

### Remote Entry

```text
remoteEntry.js
```

### Exposed Modules

| Module         | Source                     |
| -------------- | -------------------------- |
| `./AccountApp` | `src/App.jsx`              |
| `./AppRoutes`  | `src/routes/AppRoutes.jsx` |
| `./eventBus`   | `src/services/eventBus.js` |

### Local Development Port

```text
5003
```

The Shell application can consume the exposed modules through the generated `remoteEntry.js`.

---

## ⚙️ Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/tasneemjber/ecoswap-account-orders.git
cd ecoswap-account-orders
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application runs on:

```text
http://localhost:5003
```

### 4. Build the project

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

---

## 🌍 Live URL

**To be added after deployment.**

---

## 👩‍💻 Component Owner

**Account & Orders — React**

Part of the **EcoSwap E-commerce Platform** Microfrontend Project.

---

## 📄 License

This project is developed for academic purposes.

This project is part of the E-commerce Microfrontend course assignment. Free for educational use.urse assignment. Free for educational use.
>>>>>>> d3b38a4 (Initial account and orders microfrontend)
