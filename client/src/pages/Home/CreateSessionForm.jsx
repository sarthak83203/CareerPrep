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
        <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">
                Start Your new Interview Journey
            </h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-3">
                Fill out the few quick details and unlock your personalized set of interview questions!
            </p>

            <form onSubmit={handleCreateSession} className="flex flex-col gap-3">

                <Input
                    value={formData.role}
                    onChange={({ target }) => handleChange("role", target.value)}
                    label="Target Role"
                    placeholder="(eg. Frontend, Backend, Full-stack, UI/UX Design etc..)"
                    type="text"
                />

                <Input
                    value={formData.experience}
                    onChange={({ target }) => handleChange("experience", target.value)}
                    label="Years of Experience"
                    placeholder="(eg. 1 year, 2 years etc..)"
                    type="text"
                />

                <Input
                    value={formData.topicsToFocus}
                    onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                    label="Topics to Focus On"
                    placeholder="(eg. React, MongoDB, Express, Node.js etc...)"
                    type="text"
                />

                <Input
                    value={formData.description}
                    onChange={({ target }) => handleChange("description", target.value)}
                    label="Write Description"
                    placeholder="Any specific goals or notes for session"
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
                    <p className="text-red-500 text-xs pb-2.5">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="btn-primary w-full mt-2"
                    disabled={isLoading}
                >
                    {isLoading && <SpinnerLoader />}
                    Create Session
                </button>

            </form>
        </div>
    );
}
