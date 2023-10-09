const db = require("../../helper/mongoDB");

const userModel = db.users;

exports.readAllUsers = async (call, callback) => {
    try {
      let dbResponse = {};
      const response = await userModel.find(call.request);
  
      if (response && response.length > 0) {
        dbResponse.details = response;
      }
  
      return callback(null, dbResponse);
    } catch (error) {
      return callback(error);
    }
  };