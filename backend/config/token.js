import jwt from "jsonwebtoken";

const getToken = async (userId) => {
  try {
    const token = jwt.sign(
      { userId },
      "JHGDSJHKJSD",
      { expiresIn: "10d" }
    );

    return token;
  } catch (error) {
    console.log(error);
  }
};

export default getToken;