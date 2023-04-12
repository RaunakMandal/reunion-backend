const jwt = require("express-jwt");

exports.isAuthenticated = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).json({
            message: "No authorization token found",
            success: false,
        });

    const auth = jwt.expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
        userProperty: "auth",
    });

    auth(req, res, next);
};

// exports.isAllowedToAccess = (req, res, next) => {
//     if (req.auth._id !== req.params.id)
//         return res.status(401).json({
//             message: "You are not allowed to access this resource",
//             success: false,
//         });

//     next();
// }