const app = require("./server");

const productRoutes = require("./routes/products");

app.use("/api/products", productRoutes);
