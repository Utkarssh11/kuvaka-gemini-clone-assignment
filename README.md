
# Gemini Frontend Clone – Kuvaka Tech Assignment

A responsive and interactive frontend clone of a Gemini-style AI chat application built using React.js. This project simulates chat functionality with features like OTP login, chatrooms, AI responses, image uploads, and dark mode – all built using modern frontend tools

## Live Demo

[Click here to view the live project](https://kuvaka-gemini-clone-assignment.vercel.app/login)


## Features

- OTP-based login with phone number (any 6-digit demo OTP)
- Country code dropdown with real-time data
- Create, search, and delete chatrooms
- Chat interface with AI typing indicator and responses
- Upload and preview images in chat
- Dark mode toggle with persistence
- Reverse infinite scroll for older messages
- Zustand-powered global state management
- localStorage persistence
- Fully responsive for mobile and desktop

## Tech Stack

| Feature            | Technology            |
|-------------------|------------------------|
| Frontend          | React.js (Vite)        |
| State Management  | Zustand                |
| Forms             | React Hook Form        |
| Validation        | Zod                    |
| Styling           | Tailwind CSS           |        |
| Notifications     | React Toastify         |
| Build Tool        | Vite                   |

## Folder Structure

```

src/
├── components/
│   ├── Chat/               # Chat UI, messages, input
│   ├── Forms/              # OTP and phone input forms
│   └── UI/                 # Reusable UI components
├── pages/                  # Login, Dashboard, Chatroom
├── store/                  # Zustand stores for auth, chat, and UI
├── hooks/                  # Custom hooks (debounce, scroll)
├── utils/                  # Validation and helper functions
├── App.jsx
├── main.jsx
└── index.css

````

## How to Install and Run

### Prerequisites

- Node.js v16+
- npm or yarn installed

### Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/Utkarssh11/kuvaka-gemini-clone-assignment.git

# 2. Navigate to the project folder
cd kuvaka-gemini-clone-assignment

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Open in browser
http://localhost:5173
````

### Build for Production

```bash
npm run build
```

## Key Implementation Details

### OTP Simulation

* 6-digit OTP required, but any number works
* Simulated with setTimeout to mimic network delay
* Country code options fetched from restcountries.com

### AI Typing and Throttling

* AI responses are delayed (2–5 seconds) to simulate real conversation
* Typing indicator appears before response
* Prevents message spamming

### Infinite Scroll (Reverse)

* Loads older messages as user scrolls to top
* 20 messages per scroll event
* Built using Intersection Observer API

### Form Validation

* Built using React Hook Form and Zod
* Realtime validation for all input fields
* Errors shown inline for better UX

## Project Constraints

* No backend; all data handled on client side
* Any 6-digit OTP works; purely simulated
* Messages, authentication, and theme preferences are stored in localStorage

## Deployment Ready

You can deploy this project easily using:

### Vercel

* Framework Preset: Vite
* Build Command: `npm run build`
* Output Directory: `dist`

## Contact

* Email: [patidarutkarsh9@gmail.com](mailto:patidarutkarsh9@gmail.com)
* LinkedIn: [https://www.linkedin.com/in/utkarsh-patidar-800081221/](https://www.linkedin.com/in/utkarsh-patidar-800081221/)

## Thank You – Kuvaka Tech

Thank you Kuvaka Tech for giving me this opportunity to work on the frontend developer assignment. It was a valuable experience that helped me apply my skills in building a full-featured React-based UI.


