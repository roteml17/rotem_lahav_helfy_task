# Task Manager App

## A small full‑stack task manager application with:

## 1. Setup & Installation

### Clone the repository

```bash
git clone https://github.com/roteml17/rotem_lahav_helfy_task.git
cd rotem_lahav_helfy_task
```

---

## 2. Backend Setup (Express)

Backend code is in the `backend` directory.

### Install dependencies

```bash
cd backend
npm install
```

### Run the backend

```bash
npm start
```

By default the backend runs on:

- `http://localhost:4000`

The backend uses **in‑memory storage** only (no database).  
Initial sample tasks are defined in:

- `backend/data/TaskData.js`

Whenever you restart the backend, the data resets to the initial array.

---

## 3. Frontend Setup (React + Vite)

Frontend code is in the `frontend` directory.

### Install dependencies

```bash
cd frontend
npm install
```

### Run the frontend (dev server)

```bash
npm run dev
```

Vite typically runs on:

- `http://localhost:5173`

> Make sure the backend (`npm start` in `backend/`) is running before using the UI, otherwise API calls will fail.

---

## 5. API Documentation

All endpoints are served from the backend at `http://localhost:4000`.

### 5.1 Task Model

Each task in memory has this shape:

```ts
{
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  priority: "low" | "medium" | "high";
}
```

---

### 5.2 GET `/tasks`

**Description**

Return all tasks.

**Response (200)**

```json
[
  {
    "id": 1,
    "title": "Finish React carousel",
    "description": "Implement infinite scrolling and connect to backend",
    "completed": false,
    "createdAt": "2026-03-16T11:00:00.000Z",
    "priority": "high"
  }
]
```

---

### 5.3 POST `/tasks`

**Description**

Create a new task.

**Request body**

```json
{
  "title": "string (required, non-empty)",
  "description": "string (required, non-empty)",
  "priority": "low | medium | high"
}
```

**Validation**

- `title` must be a non‑empty string.
- `description` must be a non‑empty string.
- `priority` must be one of: `low`, `medium`, `high`.

**Responses**

- `201 Created` – task created successfully.
- `400 Bad Request` – validation error.
- `500 Internal Server Error` – unexpected error.

---

### 5.4 DELETE `/tasks/:id`

**Description**

Delete a task by id.

**Responses**

- `204 No Content` – deleted successfully.
- `404 Not Found` – no task with that id.

---

### 5.5 PUT `/tasks/:id`

**Description**

Update a task by id. This endpoint expects a **full task payload** (not partial): title, description, priority, and completed status.

**Request body**

```json
{
  "title": "string (required, non-empty)",
  "description": "string (required, non-empty)",
  "priority": "low | medium | high (required)",
  "completed": true
}
```

**Validation**

- `title` non‑empty string.
- `description` non‑empty string.
- `priority` ∈ {`low`, `medium`, `high`}.
- `completed` (if provided) must be boolean.

**Responses**

- `200 OK` – returns the updated task.
- `400 Bad Request` – validation error.
- `404 Not Found` – no task with that id.

---

### 5.6 PATCH `/tasks/:id/toggle`

**Description**

Toggle the `completed` status of a task (true ↔ false).

**Request body**

- No body required.

**Responses**

- `200 OK` – returns the updated task with toggled `completed` field.
- `404 Not Found` – no task with that id.

---

## 6. Assumptions & Design Decisions

- **In‑memory storage only:**  
  No database is used; all tasks are stored in a simple array in `TaskData.js`.  
  This simplifies setup and suits a small exercise. Data resets on server restart.

- **Full‑object updates for PUT:**  
  `PUT /tasks/:id` is implemented as a full resource update.  
  The frontend, when updating priority, sends the entire task object (title, description, priority, completed) to satisfy backend validations.

- **Partial updates for PATCH (toggle):**  
  `PATCH /tasks/:id/toggle` only changes `completed`. The backend returns the updated task, and the frontend replaces it in local state.

- **No external carousel libraries:**  
  The infinite carousel is built with vanilla React and CSS (flexbox + `requestAnimationFrame` + `transform`), as required.

- **Error handling:**  
  Frontend catches fetch errors and logs them to the console.  
  Backend returns JSON error messages with appropriate HTTP status codes.

---

## 7. Time Spent (Approximate)

- **Backend setup & API implementation:** ~2 hours  
  (Express app, routes, in‑memory model, validation, status codes)

- **Frontend setup (Vite + React) & basic UI:** ~1.5 hours  
  (Initial layout, header, basic task list)
