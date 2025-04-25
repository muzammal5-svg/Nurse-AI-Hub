 
// import Questions from "@/components/ui/questions";
// import { categoryOptions, difficultyOptions } from "@/constants";
// import { redirect } from "next/navigation";
// import "./questions.css";

// export const fetchCache = "force-no-store";

// type Props = {
//   searchParams: {
//     category: string;
//     difficulty: string;
//     limit: string;
//   };
// };
// // // `pcsk_5Z6uRv_ASRYKnULCYVCiHFhyAMqCrbfXjgmCJeojybCFgs3LqXK2dSnbjiGKBeLhjWkKdY,

// // async function getData(category: string, difficulty: string, limit: string) {
// //   const res = await fetch(
// //     `http://localhost:3000/quiz/api?category=${category}&difficulty=${difficulty}&limit=${limit}`,
// //     {
// //       method: "GET",
// //     }
// //   );
// //   if (!res.ok) {
// //     throw new Error("Failed to fetch data!");
// //   }
// // console.log("this is the data",res.json);

// //   return res.json();
// // }
// async function getData(category: string, difficulty: string, limit: string) {
//   const apiKey = process.env.NEXT_PUBLIC_API_KEY;
// const res = await fetch(
//   // `http://localhost:3000/quiz/api?category=${category}&difficulty=${difficulty}&limit=${limit}`,
//   `https://opentdb.com/api.php?amount=${limit}&category=${category}&difficulty=${difficulty}&type=multiple`,
//   {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${apiKey}`,
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   }
// );

// console.log("API Response:", res); // ✅ Check response status

// if (!res.ok) {
//   const errorData = await res.text(); // ✅ Show error message
//   console.error("API Error:", errorData);
//   throw new Error("Failed to fetch data!");
// }
//   return res.json();
//    }



// const QuestionsPage = async ({ searchParams }: Props) => {
//   const category = searchParams.category as string;
//   const difficulty = searchParams.difficulty;
//   const limit = searchParams.limit;

//   const validateCategory = (category: string) => {
//     const validCategories = categoryOptions.map((option) => option.value);
//     return validCategories.includes(category);
//   };

//   const validateDifficulty = (difficulty: string) => {
//     const validDifficulties = difficultyOptions.map((option) => option.value);
//     return validDifficulties.includes(difficulty);
//   };

//   const validateLimit = (limit: string) => {
//     const parsedLimit = parseInt(limit, 10);
//     return !isNaN(parsedLimit) && parsedLimit >= 5 && parsedLimit <= 50;
//   };

//   if (
//     !validateCategory(category) ||
//     !validateDifficulty(difficulty) ||
//     !validateLimit(limit)
//   ) {
//     return redirect("/quiz");
//   }

//   const response = await getData(category, difficulty, limit);
//   // const questions = await fetchQuizQuestions(category, difficulty, limit);
  

//   return (
//     <Questions
//       questions={response.questions}
//       limit={parseInt(limit, 10)}
//       category={category}
//     />
//   );
// };

// export default QuestionsPage;

// comment .......................................................................


// // import { useState, useEffect } from "react";

// // const QuestionsPage = ({ searchParams }) => {
// //   const [questions, setQuestions] = useState([]);
// //   const { category, difficulty, limit } = searchParams;

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const response = await getData(category, difficulty, limit);
// //       setQuestions(response.questions);
// //     };
// //     fetchData();
// //   }, [category, difficulty, limit]);

// //   return <Questions questions={questions} />;
// // };

// // export default QuestionsPage;

import Questions from "@/components/questions";
import { categoryOptions, difficultyOptions } from "@/constants";
import { redirect } from "next/navigation";
import OpenAI from "openai";
import "./questions.css";

export const fetchCache = "force-no-store";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Props = {
  searchParams: {
    category: string;
    difficulty: string;
    limit: string;
  };
};

async function getData(category: string, difficulty: string, limit: string) {
  const prompt = `Generate ${limit} multiple-choice quiz questions on ${category} with ${difficulty} difficulty. 
  Each question should be a JSON object with the following structure:
  {
    "question": "Question text",
    "correctAnswer": "Correct answer",
    "incorrectAnswers": ["Wrong option 1", "Wrong option 2", "Wrong option 3"]
  }
  Return the response as a JSON array.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a quiz generator." },
      { role: "user", content: prompt }
    ],
    max_tokens: 1000,
    temperature: 0.7,
  });

  if (!response.choices || response.choices.length === 0) {
    throw new Error("Failed to fetch questions from OpenAI API!");
  }

  const responseText = response.choices[0]?.message?.content?.trim();

  try {
    const jsonData = JSON.parse(responseText);

    if (!Array.isArray(jsonData)) {
      console.error("Expected an array but received:", jsonData);
      throw new Error("OpenAI returned incorrect data format!");
    }

    // Validate each question structure
    jsonData.forEach((q, index) => {
      if (!q.question || !q.correctAnswer || !Array.isArray(q.incorrectAnswers)) {
        console.error(`❌ Invalid question at index ${index}:`, q);
        throw new Error("Question format is incorrect!");
      }
    });

    return jsonData;
  } catch (error) {
    console.error("Invalid JSON format from OpenAI!", responseText);
    throw new Error("OpenAI returned malformed JSON!");
  }
}

const QuestionsPage = async ({ searchParams }: Props) => {
  const category = searchParams.category as string;
  const difficulty = searchParams.difficulty;
  const limit = searchParams.limit;

  const validateCategory = (category: string) => {
    const validCategories = categoryOptions.map((option) => option.value);
    return validCategories.includes(category);
  };

  const validateDifficulty = (difficulty: string) => {
    const validDifficulties = difficultyOptions.map((option) => option.value);
    return validDifficulties.includes(difficulty);
  };

  const validateLimit = (limit: string) => {
    const parsedLimit = parseInt(limit, 10);
    return !isNaN(parsedLimit) && parsedLimit >= 5 && parsedLimit <= 50;
  };

  if (
    !validateCategory(category) ||
    !validateDifficulty(difficulty) ||
    !validateLimit(limit)
  ) {
    return redirect("/");
  }

  const response = await getData(category, difficulty, limit);
  console.log("Here are the questions: ", response);

  return (
    <Questions
      questions={response}
      limit={parseInt(limit, 10)}
      category={category}
    />
  );
};

export default QuestionsPage;





// async function getData(category: string, difficulty: string, limit: string) {
//   const prompt = `Generate ${limit} multiple-choice quiz questions on ${category} with ${difficulty} difficulty. Provide questions, 4 answer options, and indicate the correct answer.`;
  
//   const response = await openai.completions.create({
//     model: "gpt-3.5-turbo",
//     prompt,
//     max_tokens: 500,
//     temperature: 0.7,
//   });