import jwt from "jsonwebtoken";

// eslint-disable-next-line consistent-return

const tokenValidator = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(401).json({
      status: "401 unauthorized",
      error: "Token is Required"
    });
  jwt.verify(token, process.env.SECRET, (error, result) => {
    if (error)
      return res.status(401).json({
        status: "401 unaithorized",
        error: "Token is Required"
      });
    req.data = result;
    return next();
  });
};
export default tokenValidator;
