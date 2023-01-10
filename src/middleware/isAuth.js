
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


isAuth = async (req, res, next) => {
  console.log(req.headers.authorization);

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const jwt_token = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(jwt_token.id);

     console.log(jwt_token);
     console.log(user);

      if (!user) {
        return res.status(403).send("You dont have the permission");
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(498).send("Token Invalid");
    }
  }
};

module.exports = isAuth;
