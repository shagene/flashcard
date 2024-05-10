import LayoutAuth from "@/components/LayoutAuth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { formatTime } from "@/utils/formatTime";

const QuizDetailPage = () => {
  const router = useRouter();
  const { quizId } = router.query;
  const [quizDetails, setQuizDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuizAttemptDetails = async () => {
      try {
        const response = await fetch(
          `/api/quiz-attempt-details?attemptId=${quizId}`,
        );
        const data = await response.json();
        setQuizDetails(data);
      } catch (error) {
        console.error("Error fetching quiz attempt details:", error);
      }
    };

    if (quizId) {
      fetchQuizAttemptDetails();
    }
  }, [quizId]);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <LayoutAuth>
      <div className="text-center">
        <h1 className="text-5xl font-bold">Quiz Attempt Details</h1>
        {quizDetails.length > 0 ? (
          <div>
            <h2 className="text-3xl font-bold mt-8">
              Quiz Name: {quizDetails[0].quiz_title}
            </h2>
            <p className="mt-4">
              <strong>Attempt ID:</strong> {quizDetails[0].attempt_id}
            </p>
            <p className="mt-2">
              <strong>Date:</strong>{" "}
              {new Date(quizDetails[0].attempt_timestamp).toLocaleString()}
            </p>
            <p className="mt-2">
              <strong>Score:</strong> {quizDetails[0].score}
            </p>
            <p className="mt-2">
              <strong>Time Taken:</strong>{" "}
              {formatTime(quizDetails[0].time_taken)}
            </p>
            <div className="mt-8">
              <h3 className="text-2xl font-bold">Questions:</h3>
              {quizDetails.map((detail, index) => (
                <div key={index} className="mt-4">
                  <p className="font-bold">Question {index + 1}:</p>
                  <p>{detail.question}</p>
                  <p>
                    <strong>Selected Answer:</strong> {detail.selected_answer}
                  </p>
                  <p>
                    <strong>Correct Answer:</strong> {detail.correct_answer}
                  </p>
                  <p>
                    <strong>Result:</strong>{" "}
                    {detail.is_correct ? "Correct" : "Incorrect"}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={handleBackClick}
              className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Results
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </LayoutAuth>
  );
};

export default QuizDetailPage;
