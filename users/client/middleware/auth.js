const ApiError = require("../errors/api-errors");
const asyncHandler = require("../helper/async-handler");
const jwt = require("jsonwebtoken");
const {userClient} = require("../client");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Token from bearer authorization header
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies) {
    // Token from cookie
    token = req.cookies.token;
  } else {
    return next(ApiError.authorization("Assess Denied"));
  }

  console.log(token);
  // Make sure token exist
  if (!token) {
    return next(ApiError.unauthorized("Assess Denied. notoken"));
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userClient = await userClient.findById(decoded.id);
    next();
  } catch (err) {
    return next(ApiError.unauthorized(`Assess Denied. eroor verify`));
  }
});


