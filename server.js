const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/api");
require("dotenv").config(); // Load environment variables
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;




// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

// Serve the static files from the React app (build folder)

app.use(express.static(path.join(__dirname, "./client/build")));

// Serve the index.html for any unknown routes, enabling client-side routing

app.get("*", (req, res) => {

res.sendFile(path.join(__dirname, "./client/build", "index.html"));

});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
