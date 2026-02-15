import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

export default function SignUp({ setCurrentPage }) {
  const [profilePic, setProfilePic] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName) return setError("Enter full name");
    if (!validateEmail(email)) return setError("Enter valid email");
    if (!password || password.length < 8)
      return setError("Password must be 8+ characters");

    try {
      setLoading(true);

      let profileImageUrl = "";
      if (profilePic) {
        const res = await uploadImage(profilePic);
        profileImageUrl = res?.imageUrl || "";
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        { name: fullName, email, password, profileImageUrl }
      );

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center bg-[#070b14]">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-black" />

      {/* Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/20 blur-3xl rounded-full" />

      {/* Card */}
      <div className="relative w-full max-w-md mx-4 
                      bg-white/5 backdrop-blur-xl
                      border border-white/10
                      rounded-2xl
                      shadow-2xl
                      p-6 text-white">

        <h2 className="text-2xl font-bold text-center 
                       bg-gradient-to-r from-purple-400 to-indigo-400 
                       bg-clip-text text-transparent">
          Create an Account
        </h2>

        <p className="text-center text-sm text-gray-400 mt-2 mb-6">
          Join us today and start your journey 🚀
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">

          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          />

          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            placeholder="Sarthak Shinde"
            type="text"
          />

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="sarthak@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Minimum 8 characters"
            type="password"
          />

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold 
                       bg-gradient-to-r from-purple-600 to-indigo-600
                       hover:opacity-90 transition
                       disabled:opacity-50"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          <p className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentPage("login")}
              className="text-purple-400 hover:text-purple-300"
            >
              Login
            </button>
          </p>

        </form>
      </div>
    </div>
  );
}
