import React from "react";
import Link from "next/link";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy for Quiz App X</h1>
      <p className="text-gray-600 mb-8">Effective Date: May 1st, 2024</p>

      <h2 className="text-2xl font-bold mb-2">1. Introduction</h2>
      <p className="text-gray-700 mb-4">
        Welcome to Quiz App X. This privacy policy outlines how we collect, use,
        protect, and grant rights concerning your personal information on the
        Quiz App X app, managed by Steven H, a freelance developer.
      </p>

      <h2 className="text-2xl font-bold mb-2">2. Information Collection</h2>
      <p className="text-gray-700 mb-2">
        We collect only the information necessary for the functioning of the
        app. Currently, this is limited to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Email Address: Used solely for creating a unique user ID necessary for
          app functionality.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">3. Use of Information</h2>
      <p className="text-gray-700 mb-4">
        The information collected is used exclusively to facilitate the
        operation of the app, ensuring users can participate in quizzes and have
        personalized experiences.
      </p>

      <h2 className="text-2xl font-bold mb-2">4. Information Sharing</h2>
      <p className="text-gray-700 mb-4">
        We do not share any personal information with third parties. All data
        collected is solely for use within the app.
      </p>

      <h2 className="text-2xl font-bold mb-2">5. User Rights</h2>
      <p className="text-gray-700 mb-4">
        Users of Quiz App X have the right to request the deletion of their
        data, including email addresses, quiz results, and questions. Requests
        for data deletion can be made by contacting [email address].
      </p>

      <h2 className="text-2xl font-bold mb-2">6. Data Security</h2>
      <p className="text-gray-700 mb-4">
        We are committed to protecting your data and employ appropriate measures
        to ensure data security. However, please note that no method of
        transmission over the Internet or electronic storage is 100% secure.
      </p>

      <h2 className="text-2xl font-bold mb-2">
        7. Cookies and Tracking Technologies
      </h2>
      <p className="text-gray-700 mb-4">
        Quiz App X does not use cookies or any tracking technologies.
      </p>

      <h2 className="text-2xl font-bold mb-2">
        8. Changes to This Privacy Policy
      </h2>
      <p className="text-gray-700 mb-4">
        We may update this privacy policy from time to time. Any changes will be
        posted in a blog post or changelog accessible from the app's landing
        page. We encourage users to review our privacy policy periodically to
        stay informed of any updates.
      </p>

      <h2 className="text-2xl font-bold mb-2">9. Contact Us</h2>
      <p className="text-gray-700">
        If you have questions or concerns about this privacy policy, please
        contact [Contact Information].
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Landing Page
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
