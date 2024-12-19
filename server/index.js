const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const User = require("./database/models/User");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const { verifyToken } = require("./utils");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/products", verifyToken, productRoutes);
app.use("/cart", verifyToken, cartRoutes);

app.listen(PORT, () => {
  console.log(`Server successfully started on port ${PORT}`);
});
