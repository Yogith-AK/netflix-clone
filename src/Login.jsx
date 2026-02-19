import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_URL = "https://netflix-backend-hlqm.onrender.com";

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-black px-4">
      <h1 className="absolute top-6 left-10 text-red-600 text-3xl font-bold z-10">
        NETFLIX
      </h1>

      <img
        src="https://wallpapercave.com/wp/wp4056410.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 bg-black/80 backdrop-blur-lg p-12 rounded-md w-96 shadow-2xl">
        <h1 className="text-white text-4xl font-bold mb-8">
          Sign In
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white py-3 rounded font-semibold"
        >
          Sign In
        </button>

        <p className="text-gray-400 mt-6">
          New to Netflix?{" "}
          <Link to="/register" className="text-white hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
