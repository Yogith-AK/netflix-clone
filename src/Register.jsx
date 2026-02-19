import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const API_URL = "https://netflix-backend-hlqm.onrender.com";

  const handleRegister = async () => {
    if (!username || !email || !password || !phone) {
      alert("All fields required");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
        phone,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black/80 p-10 rounded-md w-96">
        <h1 className="text-white text-3xl font-bold mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded"
        >
          Register
        </button>

        <p className="text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-white">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
