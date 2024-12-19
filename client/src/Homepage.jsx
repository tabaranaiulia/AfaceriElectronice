import { useState, useEffect } from "react";
import Products from "./Products";
import Filters from "./Filters";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

function Homepage() {
  const [filters, setFilters] = useState({
    category: "",
  });
  const [role, setRole] = useState(""); // State to store the role

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role); // Store the role in the state
    }
  }, []);

  const goToCart = () => {
    navigate("/cart");
  };

  const goToAdmin = () => {
    navigate("/admin");
  };

  return (
    <>
      <button onClick={goToCart}>Go to cart</button>
      {/* Conditionally render the button for admin role */}
      {role === "admin" && (
        <button onClick={goToAdmin}>Go to Admin Page</button>
      )}
      <div className="homepageWrapper">
        <Filters setFilters={setFilters} />
        <div>
          <Products filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </>
  );
}

export default Homepage;
