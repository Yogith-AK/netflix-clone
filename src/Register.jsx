import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleRegister = async () => {
    if (!username || !email || !password || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
        phone
      });

      alert("Registration successful");
      navigate("/login");

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-black/80 p-10 rounded w-96">

        <h1 className="text-3xl mb-6 font-bold">Register</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 bg-gray-700 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-700 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-700 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full p-3 mb-6 bg-gray-700 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-red-600 py-3 rounded"
        >
          Register
        </button>

        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
