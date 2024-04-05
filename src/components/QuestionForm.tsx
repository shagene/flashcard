// File: src/components/QuestionForm.tsx
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import QuestionInput from "@/components/QuestionInput";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuestionFormProps {
  quizQuestions: Question[];
  updateQuizQuestions: (index: number, newQuestion: Partial<Question>) => void;
  addQuestion: () => void;
  deleteQuestion: (index: number) => void;
}

const QuestionForm = ({
  quizQuestions,
  updateQuizQuestions,
  addQuestion,
  deleteQuestion,
}: QuestionFormProps) => (
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
            <QuestionInput
              label="Question"
              value={q.question}
              onChange={(value: string) =>
                updateQuizQuestions(index, { question: value })
              }
            />
            <QuestionInput
              label="Correct Answer"
              value={q.correct_answer}
              onChange={(value: string) =>
                updateQuizQuestions(index, { correct_answer: value })
              }
            />
            {q.incorrect_answers.map((answer, answerIndex) => (
              <QuestionInput
                key={answerIndex}
                label={`Incorrect Answer ${answerIndex + 1}`}
                value={answer}
                onChange={(value: string) =>
                  updateQuizQuestions(index, {
                    incorrect_answers: q.incorrect_answers.map((a, i) =>
                      i === answerIndex ? value : a,
                    ),
                  })
                }
              />
            ))}
            <td
              className={`flex items-center justify-center ${index === 0 ? "pt-5" : ""}`}
            >
              {index === quizQuestions.length - 1 && (
                <button
                  type="button"
                  onClick={addQuestion}
                  className="mr-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium focus:outline-none text-green-600"
                >
                  <FiPlusCircle size={24} />
                </button>
              )}
              {quizQuestions.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteQuestion(index)}
                  className="justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium focus:outline-none  text-red-600"
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
);

export default QuestionForm;
