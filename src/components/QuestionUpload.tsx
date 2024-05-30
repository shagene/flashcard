import { useMutation } from "@tanstack/react-query";
import { Question } from "@/types/Question";
import { useState } from "react";
import Papa, { ParseResult } from "papaparse";

const QuestionUpload = ({
  onQuestionsUploaded,
}: {
  onQuestionsUploaded: (questions: Question[]) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [csvData, setCsvData] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const csvString = reader.result as string;
      Papa.parse(csvString, {
        header: true,
        complete: (results: ParseResult<Question>) => handleParsedData(results),
        error: handleError,
        dynamicTyping: true,
      } as Papa.ParseConfig);
    };
    reader.readAsText(file);
  };

  const handlePastedData = () => {
    Papa.parse(csvData, {
      header: true,
      complete: handleParsedData,
      error: handleError,
    } as Papa.ParseConfig);
  };

  const handleParsedData = (results: ParseResult<any>) => {
    const questions = results.data
      .filter((q) => q.question && q.correct_answer)
      .map((q) => ({
        question: q.question.trim(),
        correct_answer: q.correct_answer.trim(),
        incorrect_answers: [
          q.incorrect_answer1?.trim(),
          q.incorrect_answer2?.trim(),
          q.incorrect_answer3?.trim(),
        ].filter(Boolean),
      }));

    const isValid = questions.every(
      (q) =>
        q.question && q.correct_answer && q.incorrect_answers.every((a) => a),
    );

    if (isValid) {
      uploadQuestionsMutation.mutate(questions);
    } else {
      setError(
        "Invalid CSV format. Please make sure the CSV has columns for question, correct_answer, and 3 incorrect_answers.",
      );
    }
  };

  const handleError = (err: Papa.ParseError) => {
    setError("Error parsing CSV: " + err.message);
  };

  const uploadQuestionsMutation = useMutation({
    mutationFn: async (questions: Question[]) => {
      const response = await fetch("/api/uploadQuestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questions }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      return response.json();
    },
    onSuccess: (data) => {
      onQuestionsUploaded(data);
      setError("");
      closeModal();
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Mass Upload Questions
      </button>
      {isModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
          <div className="modal-content bg-white p-6 rounded-md shadow-lg relative z-10 w-3/4">
            <h2 className="text-3xl font-bold mb-4">Mass Upload Questions</h2>
            <p className="text-lg mb-4">
              Please upload a CSV file or paste CSV data with the following
              format:
            </p>
            <pre className="text-lg bg-gray-100 p-4 rounded-md mb-4 overflow-auto">
              question,correct_answer,incorrect_answer1,incorrect_answer2,incorrect_answer3
              {"\n"}
              What is the capital of France?,Paris,London,Berlin,Madrid{"\n"}
              What is the largest planet in our solar
              system?,Jupiter,Saturn,Neptune,Uranus{"\n"}
              Who painted the Mona Lisa?,Leonardo da Vinci,Vincent van
              Gogh,Pablo Picasso,Michelangelo{"\n"}
              What is the currency of Japan?,Yen,Dollar,Euro,Pound
            </pre>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="mb-4"
            />
            <p className="text-lg mb-2">Or paste CSV data:</p>
            <textarea
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              className="w-full h-40 p-2 border border-gray-300 rounded-md mb-4"
            />
            <button
              type="button"
              onClick={handlePastedData}
              className="justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
            >
              Upload Pasted Data
            </button>
            {error && <p className="text-lg text-red-500 mb-4">{error}</p>}
            <button
              type="button"
              onClick={closeModal}
              className="justify-center text-lg font-medium text-gray-700 hover:text-gray-800 px-4 py-2 shadow-sm border border-transparent rounded-md bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionUpload;
