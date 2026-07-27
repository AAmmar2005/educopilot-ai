# EduCopilot AI

## What it does
EduCopilot AI is a personal AI tutor that helps students genuinely *understand* topics — not just get answers. Instead of a chatbot that dumps information, it uses a Socratic teaching method: it asks guiding questions, gives real-world examples, and walks students toward the answer themselves.

**Problem it solves:** Students often struggle with topics outside class hours with no patient, one-on-one help available. Most AI tools just hand over answers, which doesn't build real understanding. EduCopilot AI is built for students (starting with myself as the first user) who want on-demand, genuinely helpful academic support — anytime, on any subject.

## Live App
🔗 [FILL IN YOUR LIVE URL HERE]

## Features
- Landing page introducing the product
- Simple account creation
- Dashboard with personal stats (AI Tutor sessions, topics covered, streak)
- **AI Tutor** — real-time Socratic-style chat tutor (core feature)
- Progress page — tracks real usage: sessions over time, topics discussed
- Light/Dark theme toggle

## The AI Feature
The AI Tutor is powered by **Google Gemini** (via the Gemini API), used in multi-turn chat mode. It runs on this system instruction:

> "You are a warm, encouraging Socratic AI tutor. Speak like a real, caring human tutor — not a scripted bot. Use a friendly, natural, conversational tone. Give responses with real depth — don't just ask a one-line question and stop; add helpful context, a short real-world example or analogy, or a brief explanation before inviting the student to think further. Still follow the Socratic method (guide the student to think rather than just handing over the full answer immediately), but be generous with helpful context along the way. Adapt response length to the topic's complexity. Use the student's name occasionally and naturally. Make the conversation feel like genuine one-on-one tutoring, not a quiz bot."

Each session is saved to Firestore so the Dashboard and Progress pages reflect real usage data.

## Tools & Services Used
- **Google AI Studio (Build)** — used to build the app end-to-end from natural-language prompts
- **Google Gemini API** — powers the AI Tutor
- **Firestore** — stores user sessions and progress data
- [FILL IN: Cloud Run / whatever you used to deploy] — hosting/deployment
- **GitHub** — version control and public repo

## Screenshots
[ADD 3+ SCREENSHOTS HERE — Landing page, AI Tutor chat in action, Dashboard/Progress]

## How to Run Locally
1. Clone this repo: `git clone [YOUR REPO URL]`
2. Install dependencies: `npm install`
3. Add a `.env` file with your own Gemini API key and Firebase config (see `.env.example` if present)
4. Run: `npm run dev`

Built as a solo, individual project for [FILL IN: your course/assignment name] — designed, built, and shipped end-to-end by [FILL IN: your name].
