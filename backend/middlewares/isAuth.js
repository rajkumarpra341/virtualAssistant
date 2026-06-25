import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log("TOKEN =", token);

    if (!token) {
      return res.status(400).json({ message: "token not found" });
    }

    const verifyToken = jwt.verify(token, "JHGDSJHKJSD");

    console.log("VERIFY =", verifyToken);

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    console.log("JWT ERROR =", error.message);

    return res.status(400).json({
      message: "is Auth error",
      error: error.message
    });
  }
};

export default isAuth;