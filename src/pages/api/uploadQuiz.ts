// Simplified function to upload the quiz title and CSV file
async function uploadQuiz(title, file) {
  // First, create a new quiz and get its ID
  const quizResponse = await fetch("/api/quizzes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  const { quizId } = await quizResponse.json();

  // Then, parse and upload the flashcards for this quiz
  Papa.parse(file, {
    complete: async (results) => {
      const flashcards = results.data.map((row) => ({
        quiz_id: quizId,
        question: row[0],
        correct_answer: row[1],
        incorrect_answer1: row[2],
        incorrect_answer2: row[3],
        incorrect_answer3: row[4],
      }));

      await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flashcards }),
      });
    },
  });
}
