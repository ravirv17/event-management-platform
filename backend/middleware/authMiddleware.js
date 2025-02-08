import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    console.log("❌ No Authorization header found");
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  if (!authHeader.startsWith("Bearer ")) {
    console.log("❌ Authorization header is incorrect:", authHeader);
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const token = authHeader.split(" ")[1]; // Extract the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token successfully decoded:", decoded);

    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (error) {
    console.log("❌ Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
