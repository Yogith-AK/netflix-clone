import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${API_URL}/login`, {
        username,
        password
      });

      alert("Login successful");
      navigate("/");

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-black/80 p-10 rounded w-96">

        <h1 className="text-3xl mb-6 font-bold">Sign In</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 bg-gray-700 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-6 bg-gray-700 rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 py-3 rounded"
        >
          Sign In
        </button>

        <p className="mt-4">
          New to Netflix?{" "}
          <Link to="/register" className="text-red-500">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
