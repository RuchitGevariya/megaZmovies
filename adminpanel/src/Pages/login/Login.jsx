import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill all fields");

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      }, {
        withCredentials: true // important for cookies
      });

      if (res.data.success) {
        alert("Login successful");
        navigate('/'); 
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Login error");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default AdminLogin;
