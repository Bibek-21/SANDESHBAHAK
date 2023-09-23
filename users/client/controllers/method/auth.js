const ApiError = require("../../errors/api-errors");

const { sendResponse } = require("../../helper/response");
const sendTokenResponse = require("../../helper/send-token-response");

// Model user
const { userClient } = require("../../client");

//@des      Register user
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = async (req, res, next) => {
  const { name, email, role, phoneNumber, password } = req.body;

  // Create user
  const user = await userClient.create({
    name,
    email,
    role,
    phoneNumber,
    password,
  });
  return sendTokenResponse(user, 200, res);
};

//@des      Login user
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ApiError(400, "Please provide an email and password"));
  }
  const user = await User.findOne({ email: email }).select("+password");

  // Check for user with email.
  if (!user) {
    return next(ApiError.notfound("Invalid crediential."));
  }
  // Check the password matched or not with the hashed password in db
  const isMatched = await userClient.matchPassword(password);

  // Sent Error to the client with code 400 invalid crediential.
  if (!isMatched) {
    return next(ApiError.notfound("Invalid crediential."));
  }
  // If passed all then send response token and set cookie is defaul in this function
  return sendTokenResponse(user, 200, res);
};

// @desc    Log user out
// @route   GET /api/v1/auth/logout
// @access  Private

exports.logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  return sendResponse(
    res,
    {
      status: "Succes",
      message: "Logout success.",
    },
    200,
    "application/json"
  );
};

// @desc    Get current User
// @route   GET /api/v1/auth/me
// @access  Private

exports.getMe = async (req, res, next) => {
  const user = await userClient.findById(req.user.id);

  if (!user) {
    return next(ApiError.notfound(`User of id${req.user.id}`));
  }
  return sendResponse(
    res,
    {
      status: "Sucess",
      data: user,
    },
    200,
    "application/json"
  );
};
