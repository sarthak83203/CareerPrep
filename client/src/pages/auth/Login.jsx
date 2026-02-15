import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

export default function Login({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {updateUser}=useContext(UserContext);

  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    setError("Please enter a valid email address");
    return;
  }

  if (!password) {
    setError("Password is required");
    return;
  }

  setError("");
  setLoading(true);

  try {
    const response = await axiosInstance.post(
      API_PATHS.AUTH.LOGIN,
      { email, password }
    );

    const { token, user } = response.data;

    if (!token) {
      setError("Login failed. No token received.");
      return;
    }

    // Store token
    localStorage.setItem("token", token);

    // Update global user context
    updateUser(user);

    // Navigate after success
    navigate("/dashboard");

  } catch (err) {
    setError(
      err.response?.data?.message || "Invalid email or password"
    );
  } finally {
    setLoading(false);
  }
};


 return (
  <div className="fixed inset-0 overflow-hidden flex items-center justify-center bg-[#050816]">

    {/* Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/10 to-black"></div>

    {/* Glow Orbs */}
    <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/20 blur-3xl rounded-full"></div>

    <div className="relative w-full max-w-md mx-4">

      {/* Glass Card */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10
                      rounded-2xl shadow-2xl
                      p-8 text-white">

        <h3 className="text-3xl font-bold
                       bg-gradient-to-r from-purple-400 to-indigo-400
                       bg-clip-text text-transparent">
          Welcome Back
        </h3>

        <p className="text-sm text-gray-400 mt-2 mb-8">
          Login to continue to your dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
          />

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 
                            border border-red-500/20 
                            p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold
                       bg-gradient-to-r from-purple-600 to-indigo-600
                       hover:opacity-90 transition
                       disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-gray-400 text-center mt-4">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentPage("signup")}
              className="text-purple-400 hover:text-purple-300"
            >
              Sign up
            </button>
          </p>

        </form>
      </div>
    </div>
  </div>
);



}
