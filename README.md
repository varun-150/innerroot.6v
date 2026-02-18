# Inner Root - Indian Heritage & Wellness Platform

Inner Root is a next-generation immersive platform that blends the exploration of Indian cultural heritage with AI-driven spiritual and emotional guidance. It provides a cinematic and emotionally resonant digital experience for users to connect with their roots and improve their inner well-being.

## 🌟 Key Features

### 🏛️ Heritage Exploration
- **Virtual Tours**: Immersive exploration of historical landmarks and sacred sites.
- **Cultural Database**: Detailed insights into Indian Traditions, Festivals, Arts, and Scriptures.
- **Museums & Archives**: Digital access to cultural artifacts and historical records.

### 🧘 Wellness & Wisdom
- **Wellness Module**: Curated sessions for Meditation, Yoga, Pranayama (Breathing), and Chanting.
- **Daily Wisdom**: AI-driven spiritual insights and daily affirmations.
- **Mood Tracking**: Personalized emotional wellness tracking and journaling.

### 🤝 Community & Interaction
- **Discussion Forums**: Connect with like-minded individuals to discuss heritage and spirituality.
- **Events & Workshops**: Stay updated on cultural events and wellness workshops.
- **Personalized Dashboard**: Track your progress in wellness journeys and heritage exploration.

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.5.10
- **Language**: Java 21
- **Database**: PostgreSQL (hosted on Supabase)
- **Security**: Spring Security, JWT (JSON Web Tokens), OAuth2 (Google Login)
- **Build Tool**: Maven

### Frontend
- **Library**: React 19 (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Navigation**: React Router 7
- **UI Components**: Lucide-React for icons, D3.js/React-Simple-Maps for interactive visuals.

## 📂 Project Structure

```text
e:/v2 inner/
├── inner-root-backend/    # Spring Boot application
│   ├── src/main/java/     # Core logic, controllers, models, and security
│   └── pom.xml            # Backend dependencies
├── react-project/         # React frontend application
│   ├── src/pages/         # Main application pages (Home, Explore, Wellness, etc.)
│   ├── src/components/    # Reusable UI components
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- JDK 21+
- Node.js & npm
- Maven (or use the provided `./mvnw`)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd inner-root-backend
   ```
2. Configure your Supabase/PostgreSQL credentials in `src/main/resources/application.properties`.
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Navigate to the React project directory:
   ```bash
   cd react-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
