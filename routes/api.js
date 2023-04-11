const express = require("express");
const { signup, authenticate, getUser, follow, unfollow } = require("../controllers/user");
const { getAllPosts } = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "App is working",
    success: true,
  });
});

router.post("/signup", signup);

// Required routes for the app
router.post("/authenticate", authenticate);
router.get("/user", isAuthenticated, getUser);
router.post("/follow/:id", isAuthenticated, follow);
router.post("/unfollow/:id", isAuthenticated, unfollow);

router.get("/all_posts", isAuthenticated, getAllPosts);

module.exports = router;
