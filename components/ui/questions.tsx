"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { alphabeticNumeral, showCategory } from "@/constants";
import useModalStore from "@/hooks/useModalStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Question = {
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
};

type Props = {
  questions: Question[];
  limit: number;
  category: string;
};

const Questions = ({ questions, limit, category }: Props) => {
  const [curr, setCurr] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [score, setScore] = useState(0);
  const { onOpen } = useModalStore();
  const [key, setKey] = useState(0);

  const handleShuffle = (correctAnswer: string, incorrectAnswers: string[]) => {
    const shuffledAnswers = [...incorrectAnswers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    const randomIndex = Math.floor(Math.random() * (shuffledAnswers.length + 1));
    shuffledAnswers.splice(randomIndex, 0, correctAnswer);
    return shuffledAnswers;
  };

  const handleSelect = (selectedAnswer: string) => {
    const question = questions[curr];
    setSelected(selectedAnswer);
    
    if (selectedAnswer === question.correctAnswer) {
      // @ts-ignore
      toast.success(`Correct!, ${question?.SugesstionOfCorrectAnswer?.[1]}`, { position: "bottom-center" });
      setScore(score + 1);
    } else {
      setShowCorrect(true);
      setTimeout(() => {
        // @ts-ignore
        toast.info(`Correct answer is "${question.correctAnswer}", ${question?.SugesstionOfCorrectAnswer?.[0]}`, { position: "bottom-center" });
      }, 1000);
    }
  };

  const handleNext = () => {
    setCurr((curr) => curr + 1);
    setSelected(null);
    setShowCorrect(false);
    setKey((prevKey) => prevKey + 1);
  };

  const handleQuit = () => {
    onOpen("quitQuiz");
  };

  const handleShowResult = () => {
    onOpen("showResults", { score, limit });
  };

  const handleTimeUp = () => {
    toast.info("You ran out of time!");
    handleSelect(questions[curr].correctAnswer);
  };

  useEffect(() => {
    if (questions.length >= 5) {
      setAnswers(handleShuffle(questions[curr].correctAnswer, questions[curr].incorrectAnswers));
    }
    setProgressValue((100 / limit) * (curr + 1));
  }, [curr, questions, limit]);

  if (!questions || !answers.length) {
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
              className={`option ${
                selected === answer
                  ? answer === questions[curr].correctAnswer
                    ? "correct"
                    : "incorrect"
                  : showCorrect && answer === questions[curr].correctAnswer
                  ? "correct"
                  : ""
              }`}
              disabled={!!selected}
              onClick={() => {
                if (!selected) handleSelect(answer);
              }}
            >
              {alphabeticNumeral(i)} {answer}
            </button>
          ))}
        </div>
        <Separator />
        <div className="flex mt-5 md:justify-between md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full">
          <Button
            disabled={!selected}
            onClick={() => (questions.length === curr + 1 ? handleShowResult() : handleNext())}
          >
            {questions.length - 1 !== curr ? "Next Question" : "Show Results"}
          </Button>
          <Button variant="destructive" onClick={handleQuit}>
            Quit Quiz
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Questions;