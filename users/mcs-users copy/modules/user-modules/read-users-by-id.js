const db = require("../../helper/mongoDB");
const httpStatus = require("http-status");

const userModel = db.users;


exports.readUserById = async (call, callback) => {
    try {
      let response = {};
      const dbResponse = await userModel.findById(call.request.id);
      if (dbResponse) {
        //check if we can send the dbResponse directy to response instead of  this below method
        response.fullName = dbResponse.fullName;
        response.email = dbResponse.email;
        response.gender = dbResponse.gender;
        response.dob = dbResponse.dob;
        response.password = dbResponse.password;
      }
  
      return callback(null, response);
    } catch (error) {
      return callback(error);
    }
  };