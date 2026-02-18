# React User CRUD Application

A simple React-based CRUD application to manage users with Create, Read, Update, and Delete functionality.  
The application is designed with extensibility in mind so that new fields can be added with minimal changes.

---

## Features

- Create a new user
- View list of users
- Edit existing user details
- Delete user with confirmation modal
- Configuration-driven form and table (extensible design)
- Clean and user-friendly UI using Bootstrap
- Icons for better user experience (Bootstrap Icons)

---

## Tech Stack

- **React** (Vite)
- **JavaScript**
- **Bootstrap**
- **Bootstrap Icons**
- **JSON Server** (mock API)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd react-user-crud
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the mock API (JSON Server)

```bash
npx json-server db.json --port 5000
```

The API will be available at:

```
http://localhost:5000/users
```

### 4. Start the React application

```bash
npm run dev
```

The app will run at:

```
http://localhost:5173
```

---

## Extensibility -- Adding New Fields

The application is structured to make adding new fields easy and maintainable.

All form inputs and table columns are driven by a single configuration file:

```
src/userFields.js
```

### Example configuration

```js
export const userFields = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "text" },
];
```

### Adding a new field

To add a new field such as **Date of Birth**, add a new entry to the configuration:

```js
{
  name: "dob",
  label: "Date of Birth",
  type: "date"
}
```

**No changes are required in:**

- Form component
- Table component
- API logic

> The UI and backend automatically adapt to the new field.

---

## Mock API Details

This project uses **JSON Server** as a mock backend for local development.

The data is stored in:

```
db.json
```

### Example

```json
{
  "users": []
}
```

> JSON Server automatically supports new fields without backend changes.

### Deployment

> Note: The application UI is deployed on Netlify.
The backend API is mocked using JSON Server and runs locally, as allowed in the assignment.

---

