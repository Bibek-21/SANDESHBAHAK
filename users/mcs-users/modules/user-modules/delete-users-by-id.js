const db = require("../../helper/mongoDB");
const httpStatus = require("http-status");

const userModel = db.users;

exports.deleteById = async (call, callback) => {
    let response = {};
    try {
      const dbResponse = await userModel.findByIdAndRemove(call.request.id);
      if (dbResponse) {
        response.status = httpStatus.OK;
        response.message = `Delete successful`;
      }
      return callback(null, response);
    } catch (error) {
      return callback(error);
    }
  };