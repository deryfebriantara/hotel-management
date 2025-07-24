
# 🏨 Hotel List 

A full-stack hotel listing application that allows users to manage hotel entries — including viewing, searching, sorting, creating, updating, and deleting records.

## 📌 Objective

Build a hotel listing  application using Angular, Node.js with TypeScript, and GraphQL. The app supports full CRUD operations and basic UI/UX requirements.

---

## 🛠️ Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | Angular(SSR)                     |
| Backend     | Node.js + TypeScript        |
| API         | GraphQL                     |
| Database    | PostgreSQL (via Prisma ORM) |
| Hosting     | Railway (Backend), Railway (Frontend) |
| Versioning  | Git + GitHub                |

---

## 🌐 Live Demo

- **Frontend**: [https://energetic-art-production.up.railway.app/](https://energetic-art-production.up.railway.app/)  
- **GraphQL API Playground**: [https://hotel-management-production-65dd.up.railway.app/graphql](https://hotel-management-production-65dd.up.railway.app/graphql)

---

## 📦 Features Implemented

✅ View all hotel entries  
✅ Search hotel list by keyword  
✅ Sort list by name or date  
✅ Create new hotel  
✅ Update hotel info  
✅ Delete hotel entry  
✅ Fully persistent storage  
✅ Fully responsive basic design  
✅ Deployed frontend and backend  
✅ GraphQL API with query + mutation

---

## 📁 Project Structure

```

apps/
├── hotel-management-frontend/     # Angular frontend
└── hotel-management-backend/      # Node.js + GraphQL backend

libs/
└── shared/                        # Shared utilities (if any)

````

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:deryfebriantara/hotel-management.git
cd hotel-management
````

---

## ▶️ Frontend (Angular) & backend (Nestjs)

### Install & Run

```bash

npm install

nx run-many --target=serve

```

### Build for Production

```bash
npx nx run hotel-management-frontend:build --configuration=production
npx nx run hotel-management-backend:build --configuration=production
```

---

### Set Up Prisma (if using PostgreSQL)

```bash
npx prisma generate --schema=apps/hotel-management-backend/prisma/schema.prisma
npx prisma migrate dev
```

> If running locally, create a `.env` file with your database URL.


* GraphQL playground available at: `http://localhost:3000/graphql`

---

## 🧪 How the Task Was Completed

1. **Designed Schema** with `Hotel` model in GraphQL and Prisma.
2. **Implemented CRUD Resolvers** using Apollo Server and TypeScript.
3. **Set up PostgreSQL** with Prisma ORM for persistent storage.
4. **Built Angular frontend** with GraphQL queries/mutations using Apollo Client.
5. **Added search & sort functionality** in frontend.
6. **Tested** all features: create, read, update, delete, sort, and search.
7. **Deployed** backend on Railway and frontend on Vercel.
8. **Maintained Git best practices** with clean commit history.

---

### 🗃️ Additional Models

The following model(s) also exist in the database schema:

- `User`: Represents admin or hotel manager accounts (not used in frontend)
- `Booking`: Placeholder for future booking features

These models are not connected to the current UI implementation and were not part of the evaluation requirements, but are included in the backend schema for potential extensibility.


## 🧪 GraphQL Overview

### Query Example

```graphql
query {
  hotels {
    id
    name
    location
    description
    createdAt
    updatedAt
  }
}
```

### Mutation Example

```graphql
mutation {
  createHotel(input: {
    name: "Grand Hotel"
    location: "Jakarta"
    description: "5-star urban luxury"
  }) {
    id
    name
  }
}
```

---

## 📩 Submission

* **GitHub Repo**: \[ git@github.com:deryfebriantara/hotel-management.git]
* **Frontend**: [https://energetic-art-production.up.railway.app/](https://energetic-art-production.up.railway.app/)
* **Backend GraphQL**: [https://hotel-management-production-65dd.up.railway.app/graphql](https://hotel-management-production-65dd.up.railway.app/graphql)


---

## 📄 License

MIT

