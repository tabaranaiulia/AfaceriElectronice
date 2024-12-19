import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createUser } from "./utils";

function Admin() {
  const navigate = useNavigate();
  const role = useSelector((state) => state.global.role);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const role = form.role.value;

    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    console.log(role);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = { email, password, role };
    try {
      const response = await createUser(userData);
      if (response.success) {
        alert("User created successfully");
        form.reset();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user");
    }
  };

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" required />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" required />
          </div>
          <div>
            <label>Role:</label>
            <select name="role" required>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
