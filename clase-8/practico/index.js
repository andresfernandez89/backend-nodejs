const app = require("./server");

const petsRoutes = require("./routes/pets");
const peopleRoutes = require("./routes/people");

//Routes
app.use("/pets", petsRoutes);
app.use("/people", peopleRoutes);
