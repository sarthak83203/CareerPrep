import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export default function CreateSessionForm() {

    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
        numberOfQuestions: 5, 
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };
const handleCreateSession = async (e) => {
    e.preventDefault();

    const {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions,
        description,
    } = formData;

    if (!role || !experience || !topicsToFocus) {
        setError("Please fill all required fields...");
        return;
    }

    setError("");
    setIsLoading(true);

    try {
        const response = await axiosInstance.post(
            API_PATHS.AI.GENERATE_QUESTIONS,
            {
                role,
                experience,
                topicsToFocus: topicsToFocus
                    .split(",")
                    .map((t) => t.trim()),
                numberOfQuestions: Number(numberOfQuestions),
                description,
            }
        );

        if (response.data?.sessionId) {
            navigate(`/interview-prep/${response.data.sessionId}`);
        }

    } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);

        if (error.response && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError("Something went wrong");
        }
    } finally {
        setIsLoading(false);
    }
};


   return (
  <div className="flex justify-center items-center min-h-screen px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

    <div className="
      w-full md:w-[500px]
      bg-white/90 backdrop-blur-xl
      border border-white/20
      shadow-[0_25px_60px_rgba(0,0,0,0.4)]
      rounded-2xl
      p-8
      transition-all duration-500
    ">

      {/* Heading */}
      <h3 className="
        text-xl font-bold
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        bg-clip-text text-transparent
        tracking-tight
      ">
        Start Your Interview Journey 🚀
      </h3>

      <p className="text-sm text-slate-600 mt-2 mb-6 leading-relaxed">
        Fill out a few quick details and unlock your personalized AI-powered
        interview questions.
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-4">

        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="Frontend, Backend, Full-stack..."
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="1 year, 2 years..."
          type="text"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus On"
          placeholder="React, MongoDB, Node.js..."
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Session Description"
          placeholder="Any specific goals or notes..."
          type="text"
        />

        <Input
          value={formData.numberOfQuestions}
          onChange={({ target }) =>
            handleChange("numberOfQuestions", target.value)
          }
          label="Number of Questions"
          type="number"
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            relative w-full mt-3
            bg-gradient-to-r from-indigo-500 to-purple-600
            text-white font-medium
            py-3 rounded-xl
            shadow-lg
            transition-all duration-300
            hover:scale-[1.02]
            hover:shadow-[0_10px_30px_rgba(99,102,241,0.5)]
            active:scale-[0.98]
            disabled:opacity-70 disabled:cursor-not-allowed
          "
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading && <SpinnerLoader />}
            {isLoading ? "Generating..." : "Create Session"}
          </span>
        </button>

      </form>
    </div>
  </div>
);

}
