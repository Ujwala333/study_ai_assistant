# AI Study Assistant

🌐 **Live Demo:** [https://study-ai-assistant-opal.vercel.app](https://study-ai-assistant-opal.vercel.app)

A modern, intelligent study tool that instantly turns any topic or pasted lecture notes into interactive flashcards and practice quizzes. Built for speed and resilience, it uses advanced AI (Groq + Llama 3.3) to analyze unstructured text and generate structured study materials on the fly.

## 🚀 Features

- **Unrestricted Input:** Paste anything from a single word ("Photosynthesis") to a 5-page essay of lecture notes.
- **Smart Validation:** The AI intelligently detects if the input is valid study material. If you type gibberish or unrelated conversational text, it elegantly falls back to a friendly UI message instead of breaking or generating fake flashcards.
- **Interactive Flashcards:** Physical-feeling 3:2 ratio cards with 3D flip animations, keyboard navigation (Space/Arrows), and swipe gestures for mobile.
- **Practice Quizzes:** Auto-generated multiple choice questions with live score tracking and detailed explanations for every answer.
- **Live Streaming:** The AI response streams token-by-token with a live preview panel showing the JSON being written in real time, complete with a blinking cursor and pulsing indicator.
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
4. **Streaming:** Stream the AI response token-by-token so the UI feels snappier on slow connections.
5. **Refinement Loop:** Allow follow-up prompts to add more cards or adjust difficulty without regenerating everything.

## 🤖 AI Usage Note
I used AI assistants (Claude / ChatGPT) during development in the following ways:
- **Boilerplate scaffolding:** Generating initial Next.js project structure and TypeScript interface definitions.
- **CSS animations:** Getting the 3D flashcard flip CSS and conic-gradient score circle right on the first try.
- **Prompt engineering:** Iterating on the system prompt to make the LLM reliably return strict JSON with the `isStudyMaterial` validation field.
- **Debugging:** Identifying the stale-response race condition and suggesting `AbortController` as the fix.

All architecture decisions, component design, error-handling strategy, and code structure are my own. I understand every line and can explain, debug, or extend any part of it.

## ⚠️ Known Limitations
- **No session persistence:** Refreshing the page loses your generated flashcards and quiz. A database integration would fix this.
- **Groq rate limits:** The free Groq tier has rate limits; heavy usage may result in temporary 429 errors (the UI shows a friendly error message).
- **Model inconsistency on very short inputs:** A single ambiguous word (e.g., "love") may sometimes be classified as non-study-material even if it could be studied academically.
- **No streaming:** The entire response loads at once; on slow connections this means a longer loading spinner before anything appears.
- **English only:** The prompt and UI are optimised for English-language study material.

## ⏱️ Time Spent
| Phase | Time |
|---|---|
| Planning & architecture | ~1 hr |
| API route + prompt engineering + error handling | ~2 hrs |
| Flashcard component (flip, keyboard, swipe) | ~1.5 hrs |
| Quiz component (scoring, feedback, results) | ~1.5 hrs |
| UI polish (glassmorphism, animations, mobile) | ~1.5 hrs |
| README + deployment (Vercel) | ~0.5 hr |
| **Total** | **~8 hrs** |
