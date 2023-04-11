const Post = require('../models/post');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({
            owner: req.auth._id,
        });

        posts.map((post) => {
            return {
                _id: post._id,
                title: post.title,
                description: post.description,
                createdAt: post.createdAt,
                comments: post.comments,
                likes: post.likes,
            };
        });

        return res.status(200).json({
            message: 'All posts fetched successfully',
            success: true,
            posts,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
}
