# 🎓 EduCopilot AI

> **AI That Doesn't Just Grade You — It Helps You Grow.**

EduCopilot AI is an AI-powered Socratic tutoring web app designed to help students learn concepts through guided conversation, personalized recommendations, and answer evaluation.
Instead of giving only direct answers, the app encourages deeper understanding by asking meaningful questions, providing hints, and supporting active learning.

---

## 🌐 Live App & Repository

* 🔗 **Live App:** https://educopilot-ai.ai.studio/
* 💻 **GitHub Repository:** https://github.com/AAmmar2005/educopilot-ai

---

## 📌 Problem Statement

Many students rely on AI tools that instantly provide direct answers. While this may be fast, it often reduces critical thinking and weakens conceptual understanding.

EduCopilot AI solves this by acting like a supportive tutor. It guides students step by step, helps them think through problems, recommends weak topics, and creates a more interactive learning experience.

---

## 💡 Solution

EduCopilot AI provides:

* 🤖 a Socratic AI tutor
* 🎯 personalized topic recommendations
* 📊 progress tracking and answer evaluation
* 🌙 light/dark mode
* 🧠 learning support through guided conversation

The goal is to make learning more active, human-like, and concept-focused.

---

## ✨ Top Features

1. 💬 **AI Socratic Tutor Chat** — interactive tutoring with guided questioning
2. 🎯 **Personalized Recommendations** — suggested topics based on learning history
3. 📊 **Answer Evaluation** — AI scoring with feedback and weak-topic identification
4. 📈 **Progress Analytics** — study streaks, message history, and learning overview
5. 🧑‍🎓 **Guest Onboarding** — quick entry into the app without complexity
6. 🌙 **Light / Dark Mode** — clean theme switching for comfort
7. 📝 **Markdown Support** — structured and readable tutor responses
8. ➗ **LaTeX / Math Rendering** — proper display of formulas and equations
9. 📱 **Responsive UI** — works across screen sizes
10. 🎨 **Modern Dashboard Design** — clean, student-friendly learning interface

---

## 🤖 AI Feature Details

EduCopilot AI uses a Socratic tutoring approach. The AI tutor is instructed to behave like a real, caring tutor rather than a robotic chatbot.

### What the AI does

* asks guiding questions
* explains concepts in a friendly way
* gives context before asking the student to think further
* adapts response length based on topic difficulty
* uses a natural conversational tone
* supports deeper conceptual learning instead of copy-paste answers

### System instruction behind the AI

The tutor is guided by an instruction that tells it to:

* speak like a warm and encouraging human tutor
* avoid sounding scripted or repetitive
* give helpful explanations and examples
* follow the Socratic method
* use the student’s name naturally sometimes
* make the experience feel like one-on-one tutoring

### AI flow

Student message → backend AI request → Gemini response → formatted tutor reply in the app.

---

## 🛠 Tech Stack

| Tech                  | Use                     |
| --------------------- | ----------------------- |
| ⚛️ React              | Frontend UI             |
| 🟦 TypeScript         | Application logic       |
| ⚡ Vite                | Development/build tool  |
| 🎨 Tailwind CSS       | Styling                 |
| 🧩 Firebase Firestore | Data storage            |
| 🔐 Firebase           | Backend services        |
| 🤖 Google Gemini AI   | AI tutor engine         |
| 🌐 Google AI Studio   | AI-assisted development |
| 🚀 Cloud Run          | Deployment              |
| 🧱 Express            | Server/API handling     |
| 🐙 GitHub             | Version control         |

---

## 🧰 Tools & Services Used

* 🤖 Google AI Studio
* 🧠 Gemini AI
* 🔥 Firebase Firestore
* ☁️ Google Cloud Run
* 🐙 GitHub
* ⚡ Vite
* 🎨 Tailwind CSS
* ⚛️ React
* 🟦 TypeScript

---

## 🏗 Architecture

```text
User
↓
Landing Page
↓
Guest Onboarding
↓
Dashboard
↓
AI Tutor Chat
↓
Gemini AI
↓
AI Response
↓
Firestore Storage
```

---

## 📷 Screenshots

Add your screenshots in a folder named:

```text
screenshots/
```

Then place images like this:

* `screenshots/landing-page.png`
* `screenshots/onboarding.png`
* `screenshots/dashboard.png`
* `screenshots/ai-tutor.png`
* `screenshots/evaluation.png`

### Paste screenshots in README like this:

```md
## 📷 Screenshots

### 1. Landing Page
![Landing Page](screenshots/landing-page.png)

### 2. Guest Onboarding
![Guest Onboarding](screenshots/onboarding.png)

### 3. Dashboard
![Dashboard](screenshots/dashboard.png)

### 4. AI Tutor Chat
![AI Tutor Chat](screenshots/ai-tutor.png)

### 5. Answer Evaluation
![Answer Evaluation](screenshots/evaluation.png)
```

### Best placement

Put the **Screenshots** section **after Tech Stack and before How to Run**.
That is the most readable place for evaluators.

### Minimum screenshots

Use at least **3**, but **5** is much better.

---

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/AAmmar2005/educopilot-ai.git
cd educopilot-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env` file if required by the project setup.

Example:

```env
GEMINI_API_KEY=your_api_key_here
APP_URL=http://localhost:3000
```

### 4. Run the project

```bash
npm run dev
```

### 5. Open in browser

```text
http://localhost:3000
```

---

## 🎯 Target Users

* High school students
* College students
* University students
* Independent learners
* Students who want conceptual tutoring

---

## 🚀 Future Improvements

* voice-based tutoring
* quiz generation
* PDF/homework analysis
* better learning analytics
* multi-language support
* full authentication system
* student history and saved sessions
* teacher dashboard

---

## 📝 Important Notes

* This project was developed as an **ACT AI Final Project**.
* The app uses an **AI-assisted development workflow**.
* API keys should **never** be committed to GitHub.
* The deployed live app link should always remain public and working.
* Screenshots should be added before final submission.

---

## 👨‍💻 Author

**Ahmad Ammar**
Islamia University of Bahawalpur, Bahawalnagar Campus
BS Computer Science Student

---

## 📄 License

This project is developed for educational purposes as part of the ACT AI Final Project.
