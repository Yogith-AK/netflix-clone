import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !phone) {
      setError("All fields are required");
      return;
    }

    try {
      setError("");

      await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
        phone,
      });

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleRegister}
        className="bg-black/80 p-10 rounded-md w-96"
      >
        <h1 className="text-white text-3xl font-bold mb-6">
          Create Account
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-red-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-red-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-red-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full p-3 mb-6 bg-gray-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-red-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold">
          Register
        </button>

        <p className="text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-white hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
