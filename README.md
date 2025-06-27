# ZCoder

ZCoder is a collaborative coding platform designed for practicing coding problems, real-time collaboration, and community-driven learning. Users can solve problems in a powerful code editor, join interactive rooms for live discussions, track their progress, bookmark problems, and stay updated with upcoming programming contests—all in one place.

---

## Table of Contents

- [Features](#features)
  - [Authentication & Profiles](#authentication--profiles)
  - [Problems Hub](#problems-hub)
  - [Code Editor](#code-editor)
  - [Interactive Rooms](#interactive-rooms)
  - [Chat](#chat)
  - [Bookmarks & Progress Tracking](#bookmarks--progress-tracking)
  - [Contest Calendar](#contest-calendar)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

---

## Features

### Authentication & Profiles

- **Automatic Profile Creation:** Your profile is created on first login; complete your details in the profile section.

### Problems Hub

- **Practice Problems:** Browse, search, and filter a curated set of coding problems by difficulty, tags, and status.
- **Problem Details:** View rich problem descriptions, examples, constraints, and reveal official solutions.
- **Progress Visualization:** See your solved/unsolved stats and progress breakdown by difficulty.

### Code Editor

- **VS Code-like Editor:** Solve problems in a Monaco-powered editor with syntax highlighting and C++ support.
- **Custom Input & Output:** Test your code with custom input and view output instantly.
- **Run Code:** Secure server-side code execution for C++.

### Interactive Rooms

- **Real-Time Collaboration:** Join or create rooms to discuss and solve problems together.
- **User List:** See who is in the room, with avatars.
- **Problem Sharing:** Discuss specific problems in context.

### Chat

- **Room Chat:** Live chat in collaborative rooms.
- **Notifications:** Mute/unmute notifications as needed.

### Bookmarks & Progress Tracking

- **Bookmark Problems:** Save problems for later review.
- **Mark as Solved:** Track which problems you’ve completed.
- **Profile Stats:** View your progress and bookmarks in your profile.

### Contest Calendar

- **Upcoming Contests:** Stay updated with upcoming contests from LeetCode, Codeforces, AtCoder.
- **Direct Links:** Access contest pages and details with one click.

---

## Installation

To install and run ZCoder locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adityaj1706/zcoder.git
   ```
2. **Create a .env file in the server folder and paste the following code into it:**
   ```bash
   MONGO_URL=mongodb+srv://Sagnik:sagnik007@nodecoursecluster.k4nst4j.mongodb.net/Zcoder
   RAPIDAPI_KEY=e837d006d3mshd57e026c4b37d16p1f38d5jsn46102bdf98e2
   ```


3. **Install dependencies and start all services:**
   ```bash
   cd zcoder-app
   npm install
   npm run build
   cd server
   npm install
   npm start
   ```

---

## Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Sign up to create your account.
- Start solving problems.
- Join or create rooms for collaborative problem-solving.
- Use the Problems Hub to browse and filter problems.
- Bookmark and mark problems as solved to track your progress.
- Check the Contest Calendar for upcoming programming contests.

---

## Contributing

Contributions are welcome! Please open issues or pull requests for bugs, features, or improvements.

---

**Happy Coding!**
