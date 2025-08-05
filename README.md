# Gemini Frontend Clone

A fully functional, responsive frontend clone of a Gemini-style conversational AI chat app built with React.js.

## 🚀 Live Demo

[Live Demo Link - Coming Soon]

## ✨ Features

### 🔐 Authentication
- **Phone number-based OTP login/signup**
- Country code dropdown with real API integration
- Form validation using React Hook Form + Zod
- Simulated OTP sending and verification
- Toast notifications for user feedback
- Persistent authentication state

### 🗂️ Dashboard
- **Chatroom management** - Create and delete chatrooms
- **Debounced search** to filter chatrooms by name
- Responsive grid layout for chatrooms
- Real-time updates with Zustand state management
- Toast confirmations for all actions

### 💬 Chat Interface
- **Full chat UI** with user and AI messages
- **Typing indicators** ("Gemini is typing...")
- **Image upload support** with preview
- **Copy-to-clipboard** functionality on message hover
- **Auto-scroll** to newest messages
- **Reverse infinite scroll** for older messages
- **Message timestamps** and responsive design

### 🌍 Global Features
- **Dark mode toggle** with persistent state
- **Mobile responsive** design with Tailwind CSS
- **Toast notifications** using React Toastify
- **Loading skeletons** and smooth animations
- **Keyboard accessibility** for all features
- **localStorage persistence** for all data

## 🛠️ Tech Stack

| Feature | Technology |
|---------|------------|
| Framework | React.js 18 |
| Routing | React Router DOM |
| State Management | Zustand |
| Form Handling | React Hook Form |
| Validation | Zod |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Notifications | React Toastify |
| Build Tool | Vite |
| Deployment | Netlify/Vercel Ready |

## 📁 Project Structure

```
src/
├── components/
│   ├── Chat/
│   │   ├── Message.jsx
│   │   ├── MessageInput.jsx
│   │   └── TypingIndicator.jsx
│   ├── Forms/
│   │   ├── PhoneForm.jsx
│   │   └── OTPForm.jsx
│   └── UI/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── LoadingSpinner.jsx
│       └── DarkModeToggle.jsx
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── Chatroom.jsx
├── store/
│   ├── authStore.js
│   ├── chatStore.js
│   └── uiStore.js
├── hooks/
│   ├── useDebounce.js
│   └── useInfiniteScroll.js
├── utils/
│   ├── api.js
│   └── validation.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gemini-frontend-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🔧 Key Implementation Details

### OTP Simulation
- Uses `setTimeout` to simulate network delays
- Any 6-digit number works for demo purposes
- Real API integration for country codes from `restcountries.com`

### State Management with Zustand
- **Auth Store**: Manages user authentication state
- **Chat Store**: Handles chatrooms and messages
- **UI Store**: Controls dark mode and UI state
- All stores persist to localStorage automatically

### Image Upload
- Base64 encoding for image storage
- File validation (type and size limits)
- Preview functionality before upload
- Support for multiple image formats

### Infinite Scroll & Pagination
- Client-side pagination (20 messages per page)
- Intersection Observer API for scroll detection
- Smooth loading states and indicators

### Chat Throttling & Typing Indicator
- Random delays (2-5 seconds) for AI responses
- Animated typing indicator with bouncing dots
- Prevents spam and provides realistic UX

### Form Validation
- Zod schemas for type-safe validation
- React Hook Form for efficient form handling
- Real-time validation feedback

## 🎨 Design Features

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts and adaptive components

### Dark Mode
- System preference detection
- Manual toggle with persistent state
- Smooth transitions between themes

### Accessibility
- Keyboard navigation support
- ARIA labels and semantic HTML
- Focus management and screen reader support

## 📱 Mobile Responsiveness

The app is fully responsive and optimized for:
- **Mobile phones** (320px+)
- **Tablets** (768px+)
- **Desktop** (1024px+)
- **Large screens** (1280px+)

## 🔒 Security Features

- Form validation on client and server simulation
- File type and size validation for uploads
- XSS protection through proper sanitization
- Secure localStorage usage

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Vercel
1. Import your GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy!

## 🧪 Testing

The app includes comprehensive error handling and fallbacks:
- Network error handling for API calls
- Graceful degradation for unsupported features
- Loading states for all async operations
- Toast notifications for user feedback

## 📄 License

This project is created for the Kuvaka Tech Frontend Developer assignment.

## 👨‍💻 Author

Created for Kuvaka Tech Frontend Developer Role

---

**Note**: This is a demo application. All data is stored locally and any 6-digit OTP will work for testing purposes. 