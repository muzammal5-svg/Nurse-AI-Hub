"use client";

import { Button } from "components/ui/button";
import { Progress } from "components/ui/progress";
import { Separator } from "components/ui/separator";
import { alphabeticNumeral, showCategory } from "constants";
import useModalStore from "hooks/useModalStore";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { toast } from "sonner";

type QuestionType = {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  type: string;
  difficulty: string;
  regions: [];
  isNiche: boolean;
  rationale?: string;
};

type Props = {
  questions: QuestionType[];
  limit: number;
  category: string;
};

const Questions = ({ questions, limit, category }: Props) => {
  const [curr, setCurr] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const { onOpen } = useModalStore();
  const [key, setKey] = useState(0);

  useEffect(() => { 
    if (questions.length > 0) {
      setAnswers(handleShuffle(questions[curr].correctAnswer, questions[curr].incorrectAnswers));
    }
    setProgressValue(((curr + 1) / limit) * 100);
  }, [curr, questions, limit]);

  const handleShuffle = (correctAnswer: string, incorrectAnswers: string[]) => {
    const shuffledAnswers = [...incorrectAnswers, correctAnswer];
    return shuffledAnswers.sort(() => Math.random() - 0.5);
  };

  const handleCheck = (answer: string) => {
    setSelected(answer);

    setTimeout(() => {
      if (answer === questions[curr].correctAnswer) {
        setScore((prev) => prev + 1);
      }
    }, 2000);
  };

  const handleNext = () => {
    if (curr < questions.length - 1) {
      setCurr(curr + 1);
      setSelected(null);
      setKey((prev) => prev + 1);
      setShowExplanation(false);
      setExplanation(null); // Reset explanation
    } else {
      handleShowResult();
    }
  };

  const handleShowResult = () => {
    onOpen("showResults", { score, limit });
  };

  const handleQuit = () => {
    onOpen("quitQuiz");
  };

  const handleTimeUp = () => {
    toast.info("Time's up!");
    setSelected(questions[curr].correctAnswer); // Automatically select the correct answer
  };
  const fetchExplanation = async () => {
    if (!questions[curr]?.question) return;
  
    setIsLoading(true);
    setFetchError(false);
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Provide an explanation for the given question." },
            { role: "user", content: questions[curr].question }
          ],
          temperature: 0.7,
          max_tokens: 100
        }),
      });
  
      if (!response.ok) {
        throw new Error(`API Request Failed: ${response.status}`);
      }
  
      const data = await response.json();
      setExplanation(data.choices?.[0]?.message?.content || "No explanation available.");
    } catch (error) {
      console.error("Error fetching explanation:", error);
      setFetchError(true);
      setExplanation("Failed to fetch explanation. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  const handleShowExplanation = () => {
    setShowExplanation(true);
    fetchExplanation();
  };

  if (!questions.length) {
    return <Loader2 className="size-10 text-white animate-spin" />;
  }

  return (
    <div className="bg-white px-3 py-5 md:p-6 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl sm:rounded-lg">
      <Progress value={progressValue} />
      <div className="flex justify-between items-center h-20 text-sm md:text-base">
        <div className="space-y-1">
          <p>Category: {showCategory(category)}</p>
          <p>Score: {score}</p>
        </div>
        <CountdownCircleTimer
          key={key}
          isPlaying={!selected}
          duration={15}
          size={45}
          strokeWidth={4}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[15, 8, 3, 0]}
          onComplete={handleTimeUp}
        >
          {({ remainingTime }) => <div className="text-center">{remainingTime}</div>}
        </CountdownCircleTimer>
      </div>
      <Separator />
      <div className="min-h-[50vh] py-4 xl:py-8 px-3 md:px-5 w-full">
        <h2 className="text-2xl text-center font-medium">{`Q${curr + 1}. ${questions[curr].question}`}</h2>
        <div className="py-4 md:py-5 xl:py-7 flex flex-col gap-y-3 md:gap-y-5">
          {answers.map((answer, i) => (
            <button
              key={i}
              className={`option px-4 py-2 rounded-md border text-black font-medium transition-all duration-200 ${
                selected
                  ? answer === questions[curr].correctAnswer
                    ? "bg-green-800 text-white border-green-900"
                    : selected === answer
                    ? "bg-red-500 text-white border-red-900"
                    : "bg-gray-300"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              disabled={!!selected}
              onClick={() => handleCheck(answer)}
            >
              {alphabeticNumeral(i)} {answer}
            </button>
          ))}
        </div>
        <Separator />
        <div className="flex mt-5 md:justify-between md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full">
          <Button disabled={!selected} onClick={handleShowExplanation}>
            Show Explanation
          </Button>
          <Button variant="destructive" onClick={handleQuit}>
            Quit Quiz
          </Button>
        </div>
      </div>
      {showExplanation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96 text-center">
            <h3 className="text-lg font-bold mb-4">Explanation</h3>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="size-6 text-blue-500 animate-spin" />
                <p className="ml-2 text-blue-500">Fetching explanation...</p>
              </div>
            ) : fetchError ? (
              <p className="text-red-500">{explanation}</p>
            ) : (
              <p className="text-gray-700">{explanation}</p>
            )}
            <Button className="mt-4" onClick={handleNext}>
              Next Question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;