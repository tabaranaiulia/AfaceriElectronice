import { useState } from "react";
import Products from "./Products";
import Filters from "./Filters";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Homepage() {
  const [filters, setFilters] = useState({
    category: "",
  });

  const navigate = useNavigate();

  // Access the role from the Redux store
  const role = useSelector((state) => state.global.role);

  const goToCart = () => {
    navigate("/cart");
  };

  const goToAdmin = () => {
    navigate("/admin");
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ padding: "5px 10px" }} onClick={goToCart}>
          Go to cart
        </button>
        {/* Conditionally render the button for admin role */}
        {role === "admin" && (
          <button style={{ padding: "5px 10px" }} onClick={goToAdmin}>
            Go to Admin Page
          </button>
        )}
      </div>
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
