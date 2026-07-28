# AI Study Assistant

A small React application that transforms free-form text input into an interactive study session (flashcards and practice quizzes). Built for a Frontend Internship Assignment.

## Features

- **Free-form Input**: Paste notes, syllabuses, or simple topics.
- **AI Integration**: Uses Gemini 1.5 Flash to generate structured educational content (JSON).
- **Interactive UI**:
  - 3D Flip Flashcards with animations.
  - Interactive Multiple Choice Quiz.
  - Ability to re-test wrong answers after completing a quiz.
- **Robust Error Handling**:
  - Protects against stale responses (using `AbortController`).
  - Handles malformed data and API errors gracefully.
  - Loading states (custom spinner) and clear error states.
- **Premium Design**: Dark mode aesthetic, glassmorphism, and responsive layout.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory (you can copy `.env.local.example`) and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *Note: The API key is safely routed through a Next.js serverless route (`app/api/study/route.ts`), keeping it secure and out of the browser.*

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Then open [http://localhost:3000](http://localhost:3000) in your browser.

## AI Usage Note

I used an advanced AI Agent (myself) to rapidly scaffold the Next.js architecture, construct the Vanilla CSS styling (incorporating premium design aesthetics), and write the robust API integration. The decisions made regarding architecture (Next.js App Router), state management (React hooks), and network resilience (`AbortController`) were carefully designed to meet the strict requirements of the assignment, focusing on handling bad AI outputs securely and gracefully.

## Known Limitations

- **State Persistence**: The current implementation stores study sessions in memory (React state). A page refresh will clear the generated content. A stretch goal would be to persist this to `localStorage`.
- **Streaming**: The response currently waits for the full generation before displaying. While structured JSON generation can be streamed using advanced parsing, it is not implemented in this version to prioritize absolute structural integrity and validation.
- **Complex Topologies**: The application expects Gemini to conform tightly to the defined JSON schema. While Gemini 1.5 Flash supports `responseSchema` well, edge cases with highly abstract topics might still produce hallucinated structures, which will trigger the graceful error UI.

## Time Spent

- ~15 minutes (AI execution time).
