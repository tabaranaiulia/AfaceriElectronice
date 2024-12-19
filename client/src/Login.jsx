import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setToken, setRole } from "./store/slices/globalSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.length === 0 || password.length === 0) {
      setError("Email and password are mandatory fields");
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await response.json();

    if (!json.success) {
      setError(json.message);
    } else {
      const token = json.data;
      localStorage.setItem("token", token);

      // Decode the token to get the role
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      console.log(token);
      const userRole = decodedToken.role;
      console.log(userRole);

      // Dispatch actions to update the token and role in the Redux store
      dispatch(setToken(token));
      dispatch(setRole(userRole));

      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "300px",
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          required
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", height: "40px", marginBottom: "20px" }}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", height: "40px", marginBottom: "20px" }}
        />

        <button style={{ width: "100%", height: "40px" }}>Login</button>
        {error.length > 0 && (
          <span style={{ color: "red", marginTop: "20px" }}>{error}</span>
        )}
      </form>
    </div>
  );
}

export default Login;
