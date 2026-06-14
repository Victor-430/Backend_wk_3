const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  
  return token.startsWith("Bearer ").split(" ")[1];
  
  next()
};
