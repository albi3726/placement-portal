import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: "Access token required" 
      });
    }

    jwt.verify(
      token, 
      process.env.JWT_SECRET || "my-dog-is-cute",
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ 
            success: false, 
            error: "Invalid or expired token" 
          });
        }

        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Authentication failed" 
    });
  }
};