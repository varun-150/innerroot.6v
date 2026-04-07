# 🌿 Inner Root – Indian Heritage & Wellness Platform

**Inner Root** is a next-generation immersive digital platform designed to reconnect individuals with **Indian cultural heritage, spirituality, and emotional well-being** through modern technology.
It blends **heritage exploration, AI-driven wellness guidance, and community engagement** into a unified experience that promotes self-awareness, mindfulness, and cultural appreciation.

The platform aims to make traditional wisdom accessible in a contemporary digital format — combining technology, culture, and wellness into one meaningful ecosystem.

---

## 🎯 Vision & Objectives

* Promote awareness of **Indian cultural heritage and traditions**
* Provide accessible **mental wellness and spiritual guidance**
* Use modern technologies to make ancient knowledge **interactive and engaging**
* Personalize the heritage experience through **AI intelligence**

---

## ✨ Core Features

### 🏛️ Heritage Exploration

A digital gateway to India's cultural richness:

* **Virtual Tours**
  Interactive exploration of historical landmarks, temples, heritage sites, and sacred spaces.

* **Interactive Heritage Map**
  A fully zoomable and pannable digital atlas of India with markers representing major heritage, monuments, and spiritual locations using React Leaflet.

* **Cultural Knowledge Base**
  Information on traditions, festivals, arts, scriptures, philosophy, and regional heritage.

* **Digital Archives & Museums**
  Access to curated cultural artifacts, historical content, and preserved documentation.

---

### 🧘 Wellness & Spiritual Growth

Focused on emotional balance and mindful living:

* **Guided Wellness Sessions**
  Meditation, Yoga, Pranayama (breathing techniques), chanting, and relaxation exercises.

* **AI-Driven Daily Wisdom**
  Personalized affirmations, inspirational thoughts, and spiritual insights.

* **Mood Tracking & Journaling**
  Track emotional patterns, reflections, and mental wellness progress.

* **AI Recommendation Engine**
  Smart suggestions based on your mood (e.g., "Feeling stressed → Suggests specific meditation, a calming temple, and a relevant quote").

---

* **Personalized Dashboard**
  Monitor progress, saved content, activity history, and wellness journey.

---

### ⚙️ Admin Dashboard

Comprehensive management interface to oversee the platform:

* **Manage Heritage Locations:** Add, edit, or remove interactive map markers and cultural data.
* **User Management:** Monitor user roles, access, and activities.

---

## 🧠 System Highlights

* AI-assisted emotional guidance
* Interactive cultural visualization
* Secure authentication & role-based access
* Scalable full-stack architecture
* Modern responsive UI design

---

## 🤖 Automation & CI/CD

The platform utilizes **GitHub Actions** for automated build checks and deployment stability:
* **Frontend CI:** Automatic build verification for the React/Vite project.
* **Backend CI:** Java/Maven build checks ensured on every push.
* **Netlify Integration:** Seamless frontend deployment triggered by successful Git commits.

---

## 🛠️ Technology Stack

### 🔧 Backend

-------------------------------------------------------------
| Technology                | Purpose                        |
| ------------------------- | ------------------------------ |
| **Spring Boot 3.5.13**    | Backend application framework  |
| **Java 21**               | Core programming language      |
| **MySQL 8.0**             | Database (Schema: `innerrootdb`) |
| **Spring Security**       | Authentication & authorization |
| **JWT Authentication**    | Secure session handling        |
| **OAuth2 (Google Login)** | Social authentication          |
| **Maven**                 | Dependency management          |
--------------------------------------------------------------

---

### 🎨 Frontend
--------------------------------------------------------------
| Technology                    | Purpose                    |
| ----------------------------- | -------------------------- |
| **React 19 (Vite)**           | Frontend framework         |
| **Tailwind CSS**              | Modern styling             |
| **Framer Motion**             | UI animations              |
| **React Router 7**            | Navigation                 |
| **Lucide React Icons**        | UI icons                   |
| **React Leaflet / Leaflet**   | Interactive Maps           |
| **D3.js / React Simple Maps** | Interactive visualizations |
--------------------------------------------------------------

---

## 📂 Project Structure

```text
inner-root/
├── inner-root-backend/
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
│
├── react-project/
│   ├── src/pages/
│   ├── src/components/
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### ⚡ Fast Start (Windows)
For a quick launch of both the frontend and backend, use the provided automation script:

1. Open a terminal in the project root.
2. Run the start script:
   ```cmd
   .\start-all.bat
   ```
This will open two separate command windows: one for the Vite frontend and one for the Spring Boot backend.

### 📌 Prerequisites

* MySQL 8.0+ installed and running
* Node.js (latest LTS recommended)
* Maven installed (or Maven Wrapper)

---

### 🔹 Backend Setup

```bash
cd inner-root-backend
```

Configure core platform settings (Database, JWT, Google OAuth, and NVIDIA NIM) in:

```
src/main/resources/application.properties
```

> [!IMPORTANT]
> **AI Services:** This platform uses **NVIDIA NIM** for sentient heritage guidance. Ensure you have a valid `nvapi` key configured in `application.properties` or as an environment variable `NVIDIA_API_KEY`.

> [!NOTE]
> **MySQL Configuration:** The backend is pre-configured to connect to:
> - **Database:** `innerrootdb`
> - **User:** `root`
> - **Password:** `Varun@150`
>
> Ensure your local MySQL instance is running and the database `innerrootdb` exists (it will be created automatically if not present).

Run the backend:

```bash
./mvnw spring-boot:run
```

---

### 🔹 Frontend Setup

```bash
cd react-project
npm install
npm run dev
```

Application will run locally on Vite development server.

---

## 🔒 Security Features

* JWT-based authentication
* OAuth2 Google login integration
* Spring Security protection
* Secure API communication

---

## 🌍 Future Enhancements

* Mobile application integration
* Advanced AI wellness recommendations
* Multilingual cultural content
* AR/VR virtual heritage tours
* Community mentorship programs

---

## 📈 Potential Impact

This platform can:

* Improve emotional wellness through accessible spiritual practices
* Preserve and promote Indian cultural heritage digitally
* Build a conscious and culturally connected community
* Provide educational and self-development resources globally

---

## 👨‍💻 Contributors

Developed as part of an academic full-stack project focusing on cultural technology and wellness innovation.

## AKURI VENKATA SURYA VARUN
Founder & Lead Developer & UI/UX Designer

### GANGI REDDY GARI HEM SATHVIK REDDY
Co-Founder

### MD .ROOHAN
Backend Engineer

---

## 📜 License

This project is licensed under the **MIT License**.
See the LICENSE file for complete details.


