import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== "admin") {
        navigate("/"); // Navigate back to homepage if the role is not admin
      }
    } else {
      navigate("/"); // Navigate back to homepage if no token is found
    }
  }, [navigate]);

  return (
    <div>
      <h1>Admin Page</h1>
      {/* Add your admin page content here */}
    </div>
  );
}

export default Admin;
