const db = require("../../helper/mongoDB");
const httpStatus = require("http-status");

const userModel = db.users;

exports.updateById = async (call, callback) => {
    let response = {};
    try {
      const id = call.request.id;
      const dbResponse = await userModel.findByIdAndUpdate(id, call.request);
      if (dbResponse) {
        response.status = httpStatus.OK;
        response.message = `Update successful`;
      }
      return callback(null, response);
    } catch (error) {
      return callback(error);
    }
  };