import Layout from "../components/LayoutAuth";
import { useState } from "react";
import { useRouter } from "next/router";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";

const CreateQuizPage = () => {
  useAuth(); // Protect the page
  const [quizName, setQuizName] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([
    { question: "", correct_answer: "", incorrect_answers: ["", "", ""] },
  ]);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userId = localStorage.getItem("userId");

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
    if (response.ok) {
      console.log("Quiz and questions uploaded successfully", data);
      router.push("/dashboard");
    } else {
      console.error("Error uploading quiz and questions", data.error);
    }
  };

  const handleQuizNameChange = (value: string) => {
    setQuizName(value);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...quizQuestions];
    newQuestions[index].question = value;
    setQuizQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index: number, value: string) => {
    const newQuestions = [...quizQuestions];
    newQuestions[index].correct_answer = value;
    setQuizQuestions(newQuestions);
  };

  const handleIncorrectAnswerChange = (
    index: number,
    answerIndex: number,
    value: string,
  ) => {
    const newQuestions = [...quizQuestions];
    newQuestions[index].incorrect_answers[answerIndex] = value;
    setQuizQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      { question: "", correct_answer: "", incorrect_answers: ["", "", ""] },
    ]);
  };

  const deleteQuestion = (index: number) => {
    const newQuestions = [...quizQuestions];
    newQuestions.splice(index, 1);
    setQuizQuestions(newQuestions);
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
              onChange={(e) => handleQuizNameChange(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mt-8">
            <table className="table-auto w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th>Question</th>
                  <th>Correct Answer</th>
                  <th>Incorrect Answer 1</th>
                  <th>Incorrect Answer 2</th>
                  <th>Incorrect Answer 3</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {quizQuestions.map((q, index) => (
                  <tr key={index} className="mb-4">
                    <td className={index === 0 ? "pt-5" : ""}>
                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) =>
                          handleQuestionChange(index, e.target.value)
                        }
                        className="input border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-4"
                        required
                      />
                    </td>
                    <td className={index === 0 ? "pt-5" : ""}>
                      <input
                        type="text"
                        value={q.correct_answer}
                        onChange={(e) =>
                          handleCorrectAnswerChange(index, e.target.value)
                        }
                        className="input border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-4"
                        required
                      />
                    </td>
                    {q.incorrect_answers.map((answer, answerIndex) => (
                      <td
                        key={answerIndex}
                        className={index === 0 ? "pt-5" : ""}
                      >
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) =>
                            handleIncorrectAnswerChange(
                              index,
                              answerIndex,
                              e.target.value,
                            )
                          }
                          className="input border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-4"
                          required
                        />
                      </td>
                    ))}
                    <td
                      className={`flex items-center justify-center ${index === 0 ? "pt-5" : ""}`}
                    >
                      {index === quizQuestions.length - 1 && (
                        <button
                          type="button"
                          onClick={addQuestion}
                          className="mr-2 text-green-600"
                        >
                          <FiPlusCircle size={24} />
                        </button>
                      )}
                      {quizQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => deleteQuestion(index)}
                          className="text-red-600"
                        >
                          <FiMinusCircle size={24} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="submit"
            className="submit-button mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateQuizPage;
