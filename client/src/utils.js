export const getProducts = async (filters) => {
  let url = `http://localhost:3000/products`;

  if (filters.category) {
    url += `?category=${filters.category}`;
  }
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  return json;
};

export const getProductCategories = async () => {
  const token = localStorage.getItem("token");
  const result = await fetch(`http://localhost:3000/products/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const response = await result.json();
  return response;
};

export const getCartItems = async () => {
  const token = localStorage.getItem("token");
  const result = await fetch(`http://localhost:3000/cart/getCartItems`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const response = await result.json();
  return response;
};

export const addItemToCart = async (productId) => {
  const token = localStorage.getItem("token");
  await new Promise((resolve) => setTimeout(resolve, 500));
  const result = await fetch(
    `http://localhost:3000/cart/addItemToCart?productId=${productId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const response = await result.json();
  return response;
};

export const removeItemFromCart = async (productId) => {
  const token = localStorage.getItem("token");
  const result = await fetch(
    `http://localhost:3000/cart/removeItemFromCart?productId=${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const response = await result.json();
  return response;
};

export const placeOrder = async () => {
  const token = localStorage.getItem("token");
  await new Promise((resolve) => setTimeout(resolve, 500));
  const result = await fetch(`http://localhost:3000/cart/clearCart`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const response = await result.json();
  return response;
};
