// File: src/pages/create-quiz.tsx
import Layout from "../components/LayoutAuth";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import QuestionForm from "@/components/QuestionForm";
import { initialQuestion } from "@/utils/quizHelpers";
import QuestionUpload from "@/components/QuestionUpload";
import { Question } from "@/types/Question";

const CreateQuizPage = () => {
  useAuth(); // Protect the page
  const [quizName, setQuizName] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([initialQuestion]);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userId = localStorage.getItem("userUuid");

    const quizData = {
      title: quizName,
      user_id: userId,
      questions: quizQuestions,
    };

    console.log("Submitting:", quizData);

    const response = await fetch("/api/uploadQuiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });

    const data = await response.json();
    if (
      response.ok &&
      data.message === "Quiz and questions uploaded successfully"
    ) {
      console.log("Quiz and questions uploaded successfully", data);
      router.push("/dashboard");
    } else {
      console.error("Error uploading quiz and questions", data.error);
    }
  };

  const updateQuizQuestions = (
    index: number,
    part: Partial<typeof initialQuestion>,
  ) => {
    setQuizQuestions(
      quizQuestions.map((q, i) => (i === index ? { ...q, ...part } : q)),
    );
  };

  const addQuestion = () => {
    setQuizQuestions([...quizQuestions, initialQuestion]);
  };

  const deleteQuestion = (index: number) => {
    setQuizQuestions(quizQuestions.filter((_, i) => i !== index));
  };

  const handleQuestionsUploaded = (questions: Question[]) => {
    setQuizQuestions(questions);
  };

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-5xl font-bold">Create Quiz</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mx-4">
          <div>
            <label htmlFor="quizName" className="block mt-4 mb-2 text-lg">
              Quiz Name:
            </label>
            <input
              type="text"
              id="quizName"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
              required
            />
          </div>
          <QuestionUpload onQuestionsUploaded={handleQuestionsUploaded} />
          <QuestionForm
            quizQuestions={quizQuestions}
            updateQuizQuestions={updateQuizQuestions}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateQuizPage;
