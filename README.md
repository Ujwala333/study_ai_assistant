# AI Study Assistant

🌐 **Live Demo:** [https://study-ai-assistant-opal.vercel.app](https://study-ai-assistant-opal.vercel.app)

A modern, intelligent study tool that instantly turns any topic or pasted lecture notes into interactive flashcards and practice quizzes. Built for speed and resilience, it uses advanced AI (Groq + Llama 3.3) to analyze unstructured text and generate structured study materials on the fly.

## 🚀 Features

- **Unrestricted Input:** Paste anything from a single word ("Photosynthesis") to a 5-page essay of lecture notes.
- **Smart Validation:** The AI intelligently detects if the input is valid study material. If you type gibberish or unrelated conversational text, it elegantly falls back to a friendly UI message instead of breaking or generating fake flashcards.
- **Interactive Flashcards:** Physical-feeling 3:2 ratio cards with 3D flip animations, keyboard navigation (Space/Arrows), and swipe gestures for mobile.
- **Practice Quizzes:** Auto-generated multiple choice questions with live score tracking and detailed explanations for every answer.
- **Premium UI:** Glassmorphism design, smooth tab transitions, loading skeletons, and subtle gradients built with CSS modules.

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router), React, CSS Modules, Lucide Icons
- **Backend:** Next.js Route Handlers
- **AI Integration:** Groq SDK (`llama-3.3-70b-versatile`)
- **Validation:** Prompt engineering forcing strict JSON schema outputs.

## 💻 Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Ujwala333/ai-study-assistant.git
   cd ai-study-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Copy the `.env.local.example` file and rename it to `.env.local`.
   - Add your Groq API key:
     ```env
     GROQ_API_KEY=your_api_key_here
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔮 Future Improvements (Next Steps)
If I had more than the allotted time for this assignment, I would implement:
1. **Database Persistence:** Hook up a PostgreSQL database (via Prisma/Supabase) to save user decks permanently so they can review them later.
2. **Spaced Repetition:** Implement an algorithm (like SM-2) to track which flashcards the user gets wrong and show them more frequently.
3. **Exporting:** Allow users to export their generated flashcards to Anki or PDF format.
