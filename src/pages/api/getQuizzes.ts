// Import necessary types from Next.js for handling API requests and responses
import { NextApiRequest, NextApiResponse } from "next";
// Import the Supabase client from a utility file for database operations
import { supabase } from "../../utils/supabaseClient";

// Define the default export as an asynchronous function named 'handler'
// This function will be used to handle incoming API requests
export default async function handler(
  // 'req' is the request object, containing information about the incoming request
  req: NextApiRequest,
  // 'res' is the response object, used to send data back to the client
  res: NextApiResponse,
) {
  // Check if the request method is 'GET'
  if (req.method === "GET") {
    // Attempt to retrieve the 'userid' from the request headers
    const userId = req.headers.userid;

    // If 'userId' is not provided, respond with a 400 status code and an error message
    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return; // Exit the function early to prevent further execution
    }

    // Use the Supabase client to query the 'quizzes' table for records where 'user_id' matches the provided 'userId'
    // 'data' will contain the records found, and 'error' will contain any error that occurred during the query
    const { data, error } = await supabase
      .from("quizzes")
      .select("*") // Select all columns from the records
      .eq("user_id", userId); // Filter records where 'user_id' equals the provided 'userId'

    // If an error occurred during the query, respond with a 500 status code and the error message
    if (error) {
      res.status(500).json({ error: error.message });
      return; // Exit the function early to prevent further execution
    }

    // If no error occurred, respond with a 200 status code and the queried data
    res.status(200).json(data);
  } else {
    // If the request method is not 'GET', set the 'Allow' header to indicate that only 'GET' requests are allowed
    res.setHeader("Allow", ["GET"]);
    // Respond with a 405 status code and a message indicating that the method is not allowed
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
