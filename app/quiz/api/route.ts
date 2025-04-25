import { openai } from "../configuration/openAi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    const limit = searchParams.get("limit") || "5";
    
    if (!category || !difficulty) {
      return NextResponse.json(
        { message: "Category and difficulty are required." },
        { status: 400 }
      );
    }
    
    const prompt = `Generate ${limit} multiple-choice quiz questions.
    - Category: ${category}
    - Difficulty: ${difficulty}
    - Each question must have one correct answer and three incorrect answers.
    - Provide an explanation for the correct answer.
    - Format response as a JSON array of objects:
    [
      {
        "question": "Sample question?",
        "correctAnswer": "Correct Answer",
        "incorrectAnswers": ["Option 1", "Option 2", "Option 3"],
        "explanation": "Why this answer is correct."
      }
    ]
    Ensure the response is **only valid JSON**, without additional text.`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const quizData = JSON.parse(response.choices[0]?.message?.content?.trim() || "[]");
    return NextResponse.json({ questions: quizData }, { status: 200 });
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    return NextResponse.json(
      { message: "Failed to generate quiz questions", error },
      { status: 500 }
    );
  }
}