# React User Management App

A React-based User Management application built with **React** and **Vite**.

This project includes user CRUD operations, search, pagination, form validation, React Router navigation, and a To-Do application.

---

## 🚀 Features

### 👥 User Management

- View all users
- View user details
- Add new users
- Edit existing users
- Delete users
- Search users
- Pagination (10 users per page)
- Delete confirmation
- Loading state
- Error handling
- Responsive user table

### 📝 User Form

- React Hook Form
- Zod validation with Zod Resolver
- Add User form
- Edit User form
- Form error messages
- Form reset after successful submission
- Existing user data auto-loaded in Edit mode
- Contact number validation
- Email validation
- Required field validation

### ✅ To-Do App

- Add tasks
- Edit tasks
- Delete tasks
- Search tasks
- Prevent duplicate tasks
- Enter key support
- Local Storage support (tasks persist after refresh)

### 🧭 Navigation

- React Router DOM
- Sidebar navigation
- Topbar
- Active navigation links
- Nested routes
- Dynamic routes
- View / Edit / Add User pages

### 📱 Responsive Design

- Desktop, tablet, and mobile responsive layouts
- Responsive user table
- Horizontal scrolling on smaller screens

---

## 🛠️ Technologies Used

- React
- JavaScript
- Vite
- React Router DOM
- React Hook Form
- Zod
- Axios
- CSS
- DummyJSON API
- Local Storage
- pnpm

---

## 📦 Main Dependencies

```text
react
react-dom
react-router-dom
react-hook-form
@hookform/resolvers
zod
axios
```

---

## 📁 Project Structure

```text
vite-project/
│
├── public/
│
├── src/
│   ├── api/
│   │   ├── axiosClient.js
│   │   └── users.js
│   │
│   ├── components/
│   │   ├── AppLayout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   │
│   ├── hooks/
│   │   └── useLocalStorage.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Todo.jsx
│   │   └── users/
│   │       ├── UsersList.jsx
│   │       ├── UserForm.jsx
│   │       └── UserView.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── validation/
│   │   └── userValidation.js
│   │
│   ├── styles/
│   │   └── userForm.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
├── vite.config.js
└── README.md
```

---

## 🔗 Application Routes

| Route              | Description        |
|---------------------|---------------------|
| `/`                 | Home page           |
| `/todo`             | To-Do application   |
| `/about`            | About page          |
| `/contact`          | Contact page        |
| `/users`            | Users list          |
| `/users/add`        | Add new user        |
| `/users/:id`        | View user details   |
| `/users/:id/edit`   | Edit user           |

---

## 🌐 API

This project uses the [DummyJSON API](https://dummyjson.com/users) for user data.

**Base URL:** `https://dummyjson.com/users`

| Operation     | Method  | Endpoint         |
|----------------|---------|-------------------|
| Get users      | GET     | `/users`          |
| Search users   | GET     | `/users/search`   |
| Get user       | GET     | `/users/:id`      |
| Add user       | POST    | `/users/add`      |
| Update user    | PATCH   | `/users/:id`      |
| Delete user    | DELETE  | `/users/:id`      |

---

## 🔄 CRUD Operations

- **Create** — New users are created using `POST`.
- **Read** — Users and user details are fetched using `GET`.
- **Update** — Existing users are updated using `PATCH`.
- **Delete** — Users are deleted using `DELETE`.

---

## 🔍 User Search

The Users page provides a search feature. Users can be searched using:

- Name
- Email
- Phone

The search uses a **debounce delay** so the API is not called on every keystroke.

---

## 📄 Pagination

The Users page displays **10 users per page**.

Pagination includes:

- First
- Previous
- Next
- Last

The API uses `limit` and `skip` for pagination:

```javascript
const skip = (page - 1) * limit;
```

---

## 📝 Form Validation

The User Form uses **React Hook Form** for form handling and **Zod** for validation.

Zod is connected to React Hook Form using:

```javascript
zodResolver(userSchema)
```

The form validates:

- First Name
- Last Name
- Email
- Contact
- Age
- Address
- Gender

---

## ➕ Add User

Available at `/users/add`.

**Flow:**

```text
Fill Form
    ↓
React Hook Form
    ↓
Zod Validation
    ↓
POST API
    ↓
Success
    ↓
Reset Form
    ↓
Navigate to Users
```

---

## ✏️ Edit User

Uses a dynamic route: `/users/:id/edit`

Example: `/users/25/edit`

The user ID is obtained using `useParams()`. The existing user information is fetched from the API and populated into the form.

---

## 👁️ View User

The View button opens the user's detail page.

Example: `/users/25`

The user ID is obtained from the URL using `useParams()`, and the user's details are fetched from the API.

---

## 🗑️ Delete User

Before deleting a user, the application asks for confirmation.

**Flow:**

```text
Click Delete
    ↓
Confirmation
    ↓
DELETE API
    ↓
Remove User
    ↓
Update User List
```

---

## ✅ To-Do Application

The To-Do application allows users to:

- Add tasks
- Edit tasks
- Delete tasks
- Search tasks
- Prevent duplicate tasks

Tasks are saved using **Local Storage**, so they remain available after refreshing the browser.

---

## 💾 Local Storage

A custom `useLocalStorage()` hook is used for Local Storage functionality. It manages:

- Reading saved data
- Updating state
- Saving data to Local Storage

---

## 🧭 React Router

React Router is used for navigation between pages.

The project uses:

- `BrowserRouter`
- `Routes`
- `Route`
- `Link`
- `NavLink`
- `useNavigate`
- `useParams`
- Dynamic Routes
- Nested Routes

Example:

```jsx
<Link to="/users">Users</Link>
```

---

## ⚡ Axios

Axios is used for API communication. A reusable Axios client is used to keep API configuration organized. API functions are separated from UI components to keep the project clean and maintainable.

---

## ⏳ Loading & Error Handling

The application handles API loading and errors:

- While data is loading, a loading message is displayed.
- If an API request fails, an error message is shown.
- Failed requests do not incorrectly reset or navigate the form.

---

## 📱 Responsive Design

The application is responsive and works on:

- Desktop
- Laptop
- Tablet
- Mobile

The user table can scroll horizontally on smaller screens.

---

## ⚙️ Installation

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Open the project**

```bash
cd vite-project
```

**3. Install dependencies**

```bash
pnpm install
```

---

## ▶️ Run the Project

Start the development server:

```bash
pnpm run dev
```

The application will usually run at:

```text
http://localhost:5173/
```

Open the URL in your browser.

---

## 🏗️ Build the Project

Create a production build:

```bash
pnpm run build
```

Preview the production build:

```bash
pnpm run preview
```

---

## 📚 Concepts Practiced

**React**
- Components, Props, State
- `useState`, `useEffect`
- Custom Hooks

**React Router**
- `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`
- `useNavigate`, `useParams`
- Dynamic Routes, Nested Routes

**Forms**
- React Hook Form (`useForm`, `register`, `handleSubmit`, `reset`, `formState`, `errors`, `isSubmitting`)

**Validation**
- Zod, Schema, `zodResolver`, Regular Expressions

**API**
- Axios, REST API (GET, POST, PATCH, DELETE), API error handling

**Other Concepts**
- CRUD, Pagination, Search, Debouncing
- Local Storage
- Responsive Design
- Async/Await, Promises

---

## 👨‍💻 Author

**Vishal Sah**

B.Tech – Computer Science Engineering
Frontend / Web Development Enthusiast

**Skills:** HTML, CSS, JavaScript, React, Node.js, Python, SQL, Git, GitHub, REST APIs

---

## 📄 License

This project is created for learning and educational purposes.

---

## ⭐ Acknowledgement

This project was developed to practice React development, routing, CRUD operations, API integration, form handling, validation, pagination, search, and responsive UI development.