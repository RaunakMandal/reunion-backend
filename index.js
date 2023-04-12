require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/api", require("./routes/api"));

app.use("*", (req, res) => {
  return res.status(404).json({
    message: "Endpoint Not Found. Please try the correct endpoint",
    success: false,

    endpoints: [

      'POST /authenticate',
      'GET /user',
      'POST /follow/:id',
      'POST /unfollow/:id',
      'POST /posts',
      'DELETE /posts/:id',
      'POST /like/:id',
      'POST /unlike/:id',
      'POST /comment/:id',
      'GET /posts/:id',
      'GET /all_posts',
    ]
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
