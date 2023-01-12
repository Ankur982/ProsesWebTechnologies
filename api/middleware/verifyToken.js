const jwt = require("jsonwebtoken");


//middleware to verify the user
const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, "ProsesWebTechnologies", (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

//middleware to verify the Authorization
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.params.userId || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};


//middleware to verify the admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!")
    }
  });
};


//middleware to get the user details

const fetchuser = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    res.status(401).json("You are not authenticated...!")
  }

  try {

    const data = jwt.verify(token, "ProsesWebTechnologies");
    console.log(data);
    req.user = data.id;
    next();

  } catch (error) {
    res.status(401).json("You are not authenticated...!");
  }
};


module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  fetchuser
};