// File: src/pages/CreateQuizPage.tsx
import Layout from "../components/LayoutAuth";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import QuestionForm from "@/components/QuestionForm";
import { initialQuestion } from "@/utils/quizHelpers";

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

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create Quiz</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mx-4">
          <div>
            <label
              htmlFor="quizName"
              className="block text-sm font-medium text-gray-700"
            >
              Quiz Name
            </label>
            <input
              type="text"
              id="quizName"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <QuestionForm
            quizQuestions={quizQuestions}
            updateQuizQuestions={updateQuizQuestions}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
          />
          <button
            type="submit"
            className="submit-button mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateQuizPage;
