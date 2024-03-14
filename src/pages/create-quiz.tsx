import useAuth from "@/hooks/useAuth";
import Layout from "../components/LayoutAuth";

const CreateQuizPage = () => {
  useAuth(); // Protect the page

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create Quiz</h1>
        <p>Create Your Quiz</p>
      </div>
    </Layout>
  );
};

export default CreateQuizPage;
