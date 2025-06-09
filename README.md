# FrontEnd HireonAI

Frontend HireonAI
This is the frontend client for the HireonAI platform. It is a modern, responsive web application built with Next.js and styled using Tailwind CSS with a component library based on shadcn/ui. The application provides a seamless user interface for candidates to analyze their CVs, get job recommendations, and manage their profiles by interacting with the HireonAI Backend Service.

---

## 🚀 Features

- Server-Side Rendering (SSR) & Static Site Generation (SSG) with Next.js
- Responsive design first with Tailwind CSS
- Reusable, accessible, and consistent UI components with shadcn/ui
- Atomic Design principles for a scalable component architecture
- Global state management with Zustand
- Type-safe form validation using Zod and React Hook Form
- Secure client-side authentication flow
- Interactive UI with animations and micro-interactions

---

## 📦 Tech Stack

| Category          | Package                 |
| ----------------- | ----------------------- |
| Framework         | Next.js, React          |
| Styling           | Tailwind CSS, shadcn/ui |
| State Management  | zustand                 |
| Form Handling     | react-hook-form         |
| Schema Validation | zod                     |
| Data Fetching     | axios                   |
| UI & UX           | figma, shadcn/ui        |

---

## 🛠 Installation

```bash
# Clone the repo
git clone https://github.com/hireonai/frontend-hireonai.git

# Navigate into the project directory
cd frontend-hireonai

# Install dependencies
npm install
```

---

## 🧪 Available Scripts

```bash
# Run the development server
npm run dev

# Build for production
npm run build

# Start the production server
npm start
```

---

## 🔐 Environment Variables

Copy the .env.example file to .env and modify it according to your needs. The most important variable is the backend API endpoint.

```bash
# URL for the backend API
NEXT_PUBLIC_API_URL={{ API_URL }}

# URL for the ML service
NEXT_PUBLIC_ML_SERVICE_URL={{ ML_SERVICE_URL }}

# Secret key for the ML service
NEXT_PUBLIC_ML_SERVICE_SECRET_KEY={{ ML_SERVICE_SECRET_KEY }}

```

---

## 📁 Project Structure

```
src/
├── app/              # Main application routes (App Router)
├── components/       # Reusable UI components (Atomic Design)
│   ├── ui/           # Base components from shadcn/ui
│   └── shared/       # Custom composite components
├── constants/        # Global constants and site metadata
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and library configs (e.g., axios)
├── store/            # Zustand store definitions (auth, profile)
└── styles/           # Global CSS styles
```

---

## 📄 Running Locally

Once the environment variables are set up and dependencies are installed, you can start the development server:

```
npm run dev
```

Open http://localhost:3000 (or your configured port) with your browser to see the result.

---

## 🧑‍💻 Author

Developed by **HireOn.AI Team**  
[GitHub](https://github.com/hireonai)

---

## 🐛 Issues

If you encounter any bugs or have feature requests, please open an issue at:

[https://github.com/hireonai/frontend-hireonai/issues](https://github.com/hireonai/frontend-hireonai/issues)

---

## 📄 License

This project is licensed under the **ISC License**.
