import User from "../models/userModel.js";
import jwt from "jsonwebtoken"

//define the role
export const Role={
    Admin :"admin",
    User : "user"
}

//
export const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }
//call back function
    jwt.verify(token, process.env.JWT_SECRETE, async (err, decoded) => {
        if (err) {
            // Provide more specific error messages
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: "Token expired. Please login again." });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: "Invalid token. Please login again." });
            }
            return res.status(403).json({ message: "Invalid token" });
        }
        else {
            try {
                const userData = await User.findById(decoded.id);
                if (!userData) {
                    return res.status(404).json({ message: "No user with that token" });
                }
                req.user = userData;  //use it in other places
                next();
            } catch (err) {
                console.error("Authentication error:", err);
                res.status(500).json({ message: "Internal server error" })
            }
        }
    })
}


//restrction based on the user/admin
export const restrictTo = (...roles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
      if (!roles.includes(userRole)) {
        return res.status(403).json({
          message: "You don't have permission"
        });
      } else {
        next();
      }
    };
};

 