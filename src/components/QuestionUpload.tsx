import { useState } from "react";
import Papa, { ParseConfig } from "papaparse";
import { Question } from "@/types/Question";
import { ParseResult } from "papaparse";

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

  const handleParsedData = (results: Papa.ParseResult<Question>) => {
    const questions = results.data.map((q) => ({
      ...q,
      incorrect_answers: [
        q.incorrect_answers[0],
        q.incorrect_answers[1],
        q.incorrect_answers[2],
      ].filter((answer) => answer !== undefined),
    }));

    const isValid = questions.every(
      (q) =>
        q.question && q.correct_answer && q.incorrect_answers.every((a) => a),
    );

    if (isValid) {
      onQuestionsUploaded(questions);
      setError("");
      closeModal();
    } else {
      setError(
        "Invalid CSV format. Please make sure the CSV has columns for question, correct_answer, and 3 incorrect_answers.",
      );
    }
  };

  const handleError = (err: Papa.ParseError) => {
    setError("Error parsing CSV: " + err.message);
  };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Mass Upload Questions
      </button>
      {isModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
          <div className="modal-content bg-white p-6 rounded-md shadow-lg relative z-10 w-3/4">
            <h2 className="text-2xl font-bold mb-4">Mass Upload Questions</h2>
            <p className="mb-4">
              Please upload a CSV file or paste CSV data with the following
              format:
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-auto">
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
            <p className="mb-2">Or paste CSV data:</p>
            <textarea
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              className="w-full h-40 p-2 border border-gray-300 rounded-md mb-4"
            />
            <button
              type="button"
              onClick={handlePastedData}
              className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 mr-2"
            >
              Upload Pasted Data
            </button>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="button"
              onClick={closeModal}
              className="btn bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
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
