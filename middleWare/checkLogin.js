const jwt = require('jsonwebtoken')

const checkLogin = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    throw new Error("token is not available")
  }

  try {
    const userData = jwt.verify(token,process.env.TOKEN_SECRET);
    req.user = userData;
    next();  // Pass control to the next middleware or route handler
  } catch (err) {
    // console.log(err);
    return res.status(401).json({
      message: 'Invalid token',
      success: false,
      error: true
    });
  }
};

module.exports = {
  checkLogin
}

