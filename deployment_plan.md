# Deployment & Integration Plan: Inner Root Platform

## Overview
This plan outlines the steps required to deploy the **Inner Root** web application, ensuring the React frontend, Spring Boot backend, and MySQL database communicate harmoniously.

---

## 1. Local Fixes Applied
We have updated both the frontend and backend to ensure deployment readiness.

### Backend Changes:
- **Data Seeding**: Created `DataInitializer.java` to automatically seed a default admin user (`admin@innerroot.com`) and sample content (e.g., Heritage Sites) on startup. This allows immediate testing of the Admin Dashboard.
- **CORS Configuration**: Updated `application.properties` to allow communication from Vercel-hosted frontends while maintaining security for other environments.
- **Environment Variables**: Ensured all sensitive values (DB URL, JWT Secret, etc.) are externalized via environment variables.

### Frontend Changes:
- **API Connectivity**: Verified that `api.js` correctly uses `VITE_API_URL` from the environment.
- **Admin Dashboard**: Confirmed that the admin console is feature-complete, including system statistics and user management protocols.

---

## 2. Deployment Steps

### A. Database (Railway)
1. Log in to your [Railway](https://railway.app/) account.
2. Create a new Project and select **New Service** -> **Database** -> **MySQL**.
3. Once the database is created, copy the **Connection URL** (it will look like `mysql://root:...`).

### B. Backend (Railway)
1. Go to the project dashboard on Railway and select **New Service** -> **GitHub Repo**.
2. Select the `inner-root-backend` repository.
3. Configure the following **Variables** in the Service settings:
   - `DATABASE_URL`: (Paste the connection URL from the MySQL service)
   - `DB_USER`: (Your database username)
   - `DB_PASSWORD`: (Your database password)
   - `JWT_SECRET`: (A long, secure random string)
   - `ALLOWED_ORIGINS`: `https://inner-root.vercel.app` (The URL where you will deploy the frontend)
4. Railway will automatically build the service using **NIXPACKS** and deploy it.
5. Once deployed, note down the **Public URL** (e.g., `https://inner-root-production.up.railway.app/).

### C. Frontend (Vercel)
1. Log in to your [Vercel](https://vercel.com/) account.
2. Create a **New Project** and import the `react-project` directory.
3. In the **Environment Variables** section, add:
   - `VITE_API_URL`: (Paste the Railway Public URL + `/api`)
   - `VITE_GOOGLE_CLIENT_ID`: (Your Google OAuth ID, if applicable)
4. Click **Deploy**.

---

## 3. Integration Checks
Once all components are deployed, perform these checks to ensure everything is working:

1. **System Health**: Visit `https://your-backend.railway.app/api/health`. You should see a success message.
2. **Admin Login**:
   - URL: `https://your-frontend.vercel.app/login`
   - Email: `admin@innerroot.com`
   - Password: `InnerRootAdmin2026!`
3. **Data Flow**: Navigate to the **Admin Protocol** to verify that "Sentient Users" and "Heritage Sites" are populated with the seeded sample data.
4. **CRUD Testing**: Try adding a new event or updating a user's role to confirm the database write operations are successful.

---

## 4. Monitoring & Post-Deployment
- **Railway Logs**: Monitor the service logs for any JPA or Hibernate errors.
- **Vercel Analytics**: Track frontend performance and response times.
- **Flyway**: Consider enabling Flyway (`FLYWAY_ENABLED=true`) in the future for more robust schema management.

---

> [!IMPORTANT]
> **Admin Password**: Please change the default admin password immediately after the first login via the dashboard.
