const app = require("./server");
const productsRoutes = require("./routes/products");

//Engine
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/api/products", productsRoutes);
