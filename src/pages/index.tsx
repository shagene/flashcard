// src/pages/landing.tsx
import React from "react";
import Layout from "../components/LayoutNonAuth";
import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-16 space-y-8">
        <h1 className="text-5xl font-bold text-gray-700">Quiz App</h1>
        <p className="text-xl text-gray-600 text-center m-4">
          Welcome to the Quiz App! Create, manage, and study with custom
          quizzes.
        </p>
        <div className="space-x-4">
          <Link href="/auth">
            <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
              Get Started
            </button>
          </Link>
          <Link href="/blog">
            <button className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700">
              Blog / Change Log
            </button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Create Custom Quizzes</h2>
          <p className="text-lg text-gray-600">
            With our user-friendly quiz creation tool, you can easily create
            your own quizzes on any topic. Choose from various question types,
            add explanations, and customize the quiz settings to suit your
            needs.
          </p>
          <div className="mt-8 flex justify-center">
            <Image
              src="/desktop_quiz1.png"
              alt="Desktop Quiz Question"
              width={800}
              height={600}
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Study Effectively</h2>
          <p className="text-lg text-gray-600">
            Take quizzes to reinforce your knowledge and identify areas for
            improvement. Our app tracks your progress and provides detailed
            analytics to help you study more effectively.
          </p>
          <div className="mt-8 flex justify-center">
            <Image
              src="/mobile_quiz_finish.png"
              alt="Mobile Quiz Question"
              width={400}
              height={600}
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Benefits of Effective Study Habits
          </h2>
          <p className="text-lg text-gray-600">
            Developing effective study habits is crucial for academic success.
            By using our quiz app, you can:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600">
            <li>Reinforce your understanding of key concepts</li>
            <li>Identify areas where you need to focus more attention</li>
            <li>Improve your retention and recall of information</li>
            <li>Boost your confidence and performance on exams</li>
          </ul>
          <p className="text-lg text-gray-600 mt-4">
            Start building effective study habits today with our powerful quiz
            app and unlock your full learning potential!
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default LandingPage;
