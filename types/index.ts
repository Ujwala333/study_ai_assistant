export interface FlashcardType {
  id: string;
  front: string;
  back: string;
}

export interface QuizQuestionType {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface StudyDataType {
  isStudyMaterial: boolean;
  message?: string;
  title?: string;
  flashcards?: FlashcardType[];
  quiz?: QuizQuestionType[];
}
