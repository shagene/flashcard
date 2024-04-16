import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AIChatPage = () => {
  const [chatHistory, setChatHistory] = useState<
    { sender: string; message: string }[]
  >([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching chat history
    setChatHistory([
      { sender: "AI", message: "Hello! How can I assist you with your quiz?" },
    ]);
  }, []);

  const handleSendMessage = () => {
    // Simulate sending a message to the AI
    const newChatHistory = [
      ...chatHistory,
      { sender: "User", message: currentMessage },
    ];
    setChatHistory(newChatHistory);
    setCurrentMessage("");

    // Here you would typically send the message to your AI service
    // and then update the chatHistory with the AI's response
  };

  const handleGenerateQuiz = () => {
    // Simulate generating quiz data based on the chat history
    const quizData = {
      // Extract quiz data from chatHistory
    };

    // Pass the quiz data back to the create-quiz page
    router.push({
      pathname: "/create-quiz",
      query: { quizData: JSON.stringify(quizData) },
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat</h1>
      <div className="border border-gray-300 rounded-md p-4 mb-4">
        {chatHistory.map((message, index) => (
          <p
            key={index}
            className={`${message.sender === "AI" ? "text-green-500" : "text-blue-500"}`}
          >
            {message.sender}: {message.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        className="border border-gray-300 px-2 py-1 rounded mb-4"
        placeholder="Type your message..."
      />
      <button
        type="button"
        onClick={handleSendMessage}
        className="justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Send
      </button>
      <button
        type="button"
        onClick={handleGenerateQuiz}
        className="justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4"
      >
        Generate Quiz
      </button>
    </div>
  );
};

export default AIChatPage;
