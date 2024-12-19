import { useEffect, useState } from "react";
import { getProducts, addItemToCart } from "./utils";

function Products(props) {
  const { filters, setFilters } = props;
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleGetProducts = async () => {
    const data = await getProducts(filters);
    setProducts(data);
  };

  useEffect(() => {
    handleGetProducts();
  }, [filters]);

  const handleAddToCart = async (productId) => {
    setIsAdding(true);
    const res = await addItemToCart(productId);
    setIsAdding(false);
    alert(res.message);
  };

  return (
    <div className="products-container">
      {products?.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.thumbnail} alt={product.name} />
          <h2 className="product-title">{product.name}</h2>
          <div className="rating">
            {/* {renderStars(Math.round(product.rating))} */}
            <span style={{ paddingLeft: "4px", paddingRight: "4px" }}>
              {product.rating ?? "No rating"}
            </span>
            {/* <span>({product.reviews.length ?? "L"})</span> */}
          </div>
          <div className="price-cart">
            <p className="price">${product.price.toFixed(2)}</p>
            <div>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="add-to-cart"
                disabled={isAdding}
              >
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
