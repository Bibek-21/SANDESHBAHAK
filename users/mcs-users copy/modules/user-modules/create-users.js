const db = require("../../helper/mongoDB");
const httpStatus = require("http-status");

const userModel = db.users;

exports.createUser = async (call, callback) => {
  try {
    let response = {};
    let password = call.request.password;

    const dbResponse = await userModel.create(call.request);

    if (dbResponse) {
      response.status = httpStatus.ok;
      response.message = `User has been created`;
    }
    return callback(null, response);
  } catch (error) {
    return callback(error);
  }
};