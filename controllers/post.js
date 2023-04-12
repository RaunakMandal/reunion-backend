const Post = require('../models/post');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({
            owner: req.auth._id,
        });

        const postsArray = posts.map((post) => {
            return {
                _id: post._id,
                title: post.title,
                description: post.description,
                createdAt: post.createdAt,
                comments: post.comments,
                likes_count: post.likes.length,
            };
        });

        return res.status(200).json({
            message: 'All posts fetched successfully',
            success: true,
            posts: postsArray,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
}


exports.createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            throw new Error('Title and description are required');
        }
        const post = new Post({
            title: title,
            description: description,
            owner: req.auth._id,
        });

        await post.save();

        return res.status(200).json({
            message: 'Post created successfully',
            success: true,
            post,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error('Post not found');
        }

        if (post.owner.toString() !== req.auth._id.toString()) {
            throw new Error('You are not allowed to delete this post');
        }

        await post.deleteOne();

        return res.status(200).json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
}

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error('Post not found');
        }

        if (post.likes.includes(req.auth._id)) {
            throw new Error('You have already liked this post');
        }

        post.likes.push(req.auth._id);
        await post.save();

        return res.status(200).json({
            message: 'Post liked successfully',
            success: true,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
}

exports.unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error('Post not found');
        }

        if (!post.likes.includes(req.auth._id)) {
            throw new Error('You have not liked this post yet');
        }

        post.likes.pull(req.auth._id);
        await post.save();

        return res.status(200).json({
            message: 'Post unliked successfully',
            success: true,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
}

exports.commentPost = async (req, res) => {
    try {
        const { comment } = req.body;
        if (!comment) {
            throw new Error('Comment is required');
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error('Post not found');
        }

        const commentObj = {
            comment: comment,
            owner: req.auth._id,
        };

        post.comments.push(commentObj);
        await post.save();

        return res.status(200).json({
            message: 'Comment added successfully',
            success: true,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
}

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error('Post not found');
        }

        const postObj = {
            _id: post._id,
            title: post.title,
            description: post.description,
            like_count: post.likes.length,
            comments: post.comments,
        };

        return res.status(200).json({
            message: 'Post fetched successfully',
            success: true,
            post: postObj,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
}

