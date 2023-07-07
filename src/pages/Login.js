import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ handleLogin }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "Admin" && password === "Admin") {
      handleLogin();
      navigate("/home");
    } else {
        alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="auth-form-container">
        <h2 className="plslogin" style={{textAlign: "center", color: "white", marginTop: '160px', border: 'solid', borderRadius: '20px', width: '500px', marginLeft:'465px'}}>Please Login to Access Data:</h2>
      <form className="login-form" style={{marginTop: '10px'}} onSubmit={handleSubmit}>
        <label htmlFor="Username">Username</label>
        <input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Username"
          id="Username"
          name="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button className="loginButton" type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;