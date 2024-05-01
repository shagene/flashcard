import React from "react";
import Link from "next/link";

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Terms of Service for Quiz App X
      </h1>
      <p className="text-gray-600 mb-8">Effective Date: [Today's Date]</p>

      <h2 className="text-2xl font-bold mb-2">1. Acceptance of Terms</h2>
      <p className="text-gray-700 mb-4">
        By accessing and using Quiz App X, you agree to be bound by these Terms
        of Service ("Terms"). Please read these Terms carefully before using the
        app. If you do not agree to these Terms, please do not use the app.
      </p>

      <h2 className="text-2xl font-bold mb-2">2. User Responsibilities</h2>
      <p className="text-gray-700 mb-4">
        You agree to use the app only for lawful purposes and in a way that does
        not infringe the rights of, restrict or inhibit anyone else's use and
        enjoyment of the app. Prohibited behavior includes harassing or causing
        distress or inconvenience to any other user, transmitting obscene or
        offensive content, or disrupting the normal flow of dialogue within the
        app.
      </p>

      <h2 className="text-2xl font-bold mb-2">
        3. Intellectual Property Rights
      </h2>
      <p className="text-gray-700 mb-4">
        All content present on the app, including text, graphics, logos, images,
        and software, is the property of Quiz App X or is used with permission.
        You may not copy, reproduce, redistribute, or sell any content without
        express written consent.
      </p>

      <h2 className="text-2xl font-bold mb-2">
        4. Disclaimers and Limitations of Liability
      </h2>
      <p className="text-gray-700 mb-4">
        Quiz App X is provided on an "as is" and "as available" basis without
        any warranties of any kind, either express or implied. Quiz App X does
        not warrant that the app will be uninterrupted or error-free. In no
        event will Quiz App X be liable for any indirect, incidental, special,
        or consequential damages arising from the use of or inability to use the
        app.
      </p>

      <h2 className="text-2xl font-bold mb-2">5. Termination of Use</h2>
      <p className="text-gray-700 mb-4">
        Quiz App X may terminate or suspend access to the app immediately,
        without prior notice or liability, for any reason whatsoever, including,
        without limitation, if you breach the Terms.
      </p>

      <h2 className="text-2xl font-bold mb-2">6. Governing Law</h2>
      <p className="text-gray-700 mb-4">
        These Terms shall be governed by and construed in accordance with the
        laws of [Your State/Country], without giving effect to any principles of
        conflicts of law.
      </p>

      <h2 className="text-2xl font-bold mb-2">7. Changes to Terms</h2>
      <p className="text-gray-700 mb-4">
        Quiz App X reserves the right to modify these Terms at any time. We will
        notify users of any changes by posting the new Terms on the app or
        through other means of communication. Your continued use of the app
        after such changes will constitute acknowledgment and agreement of the
        modified Terms.
      </p>

      <h2 className="text-2xl font-bold mb-2">8. Contact Us</h2>
      <p className="text-gray-700 mb-4">
        If you have any questions about these Terms, please contact [Your
        Contact Information].
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

export default TermsOfService;
