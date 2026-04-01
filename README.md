# 🍕 Fast React Pizza Co.

> A modern, responsive React web application for ordering pizzas, built with the latest React Router data loading capabilities, Redux Toolkit, and Tailwind CSS.

** Live Demo:** [https://pizzassss.vercel.app](https://pizzassss.vercel.app)

---

##  Features

- **No-account Ordering:** Users can order pizzas quickly simply by entering their name and phone number.
- **Menu Display:** Retrieves the current menu from our custom API.
- **Cart Management:** Add, remove, update quantities, and clear pizzas from the cart.
- **Geolocation:** Uses browser Geolocation and a reverse geocoding API to auto-fill the user's delivery address.
- **Order Tracking & History:**
  - After placing an order, users get a unique Order ID and estimated delivery time.
  - Automatically saves the last 10 orders to local storage for quick access.
  - Users can view their order history and track the status of current orders.
- **Priority Orders:** Customers can mark their orders as "Priority" (for an extra 20% cost) either during creation or after the order has been placed.
- **Modern State Management:** Combines React Router `loaders` and `actions` for data fetching/mutating with Redux Toolkit for global UI state.

##  Built With

- **[React 18](https://react.dev/)**
- **[React Router DOM 6.4+](https://reactrouter.com/)** (Loaders, Actions, `useFetcher`, etc.)
- **[Redux Toolkit](https://redux-toolkit.js.org/)** (Global state for User Info and Cart)
- **[Tailwind CSS](https://tailwindcss.com/)** (Utility-first styling for a sleek, responsive UI)
- **[Vite](https://vitejs.dev/)** (Lightning-fast frontend build tool)

##  Getting Started

### Prerequisites

You need [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd fast-pizza
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:** Navigate to `http://localhost:5173`.

##  Project Structure

- `src/features/menu/` - Components for fetching and displaying pizzas.
- `src/features/cart/` - Cart interface, empty states, and Redux slicing.
- `src/features/order/` - Creating forms, searching, tracking single orders, and local history.
- `src/features/user/` - User global state, logout logic, and async geocoding.
- `src/features/ui/` - Reusable UI components (Header, Buttons, Loaders).
- `src/features/services/` - External API endpoints (Menu data, Geocoding).

##  Key Implementations

- **`useLoaderData` / `action`:** Instead of traditional `useEffect` data fetching, this app leans heavily into React Router's new data router features to manage API requests and form submissions natively.
- **Local Storage syncing:** Order History is maintained locally, completely decoupled from the backend but seamlessly tying into the UX.
- **Async Thunks in Redux:** The `fetchAddress` reverse geocoding request is handled directly inside the Redux slice.
