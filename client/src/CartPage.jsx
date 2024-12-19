import { useEffect, useState } from "react";
import { getCartItems, placeOrder, removeItemFromCart } from "./utils";

function CartPage(props) {
  const [cart, setCart] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleGetCart = async () => {
    const data = await getCartItems();
    setCart(data.data);
  };

  useEffect(() => {
    handleGetCart();
  }, []);

  const handleDeleteFromCart = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (!confirmDelete) {
      return;
    }
    setIsDeleting(true);
    const res = await removeItemFromCart(productId);
    setIsDeleting(false);
    alert(res.message);
  };
  const handlePlaceOrder = async () => {
    setIsDeleting(true);
    const res = await placeOrder();
    setIsDeleting(false);
    alert(res.message);
  };

  return (
    <div>
      <div className="products-container">
        {cart?.map((cart) => (
          <div key={cart.Product.id} className="product-card">
            <img src={cart.Product.thumbnail} alt={cart.Product.name} />
            <h2 className="product-title">{cart.Product.name}</h2>
            <div className="rating">
              {/* {renderStars(Math.round(product.rating))} */}
              <span style={{ paddingLeft: "4px", paddingRight: "4px" }}>
                {cart.Product.rating ?? "No rating"}
              </span>
              {/* <span>({product.reviews.length ?? "L"})</span> */}
            </div>
            <div className="price-cart">
              <p className="price">${cart.Product.price.toFixed(2)}</p>
              <div>
                <p>Quantity:{cart.quantity}</p>
              </div>
            </div>
            <div>
              <button
                onClick={async () => {
                  await handleDeleteFromCart(cart.productId);
                  handleGetCart();
                }}
                className="add-to-cart"
                disabled={isDeleting}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={async () => {
            await handlePlaceOrder();
            handleGetCart();
          }}
          className="add-to-cart"
          disabled={isDeleting}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CartPage;
