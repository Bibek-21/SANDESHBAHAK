const db = require('../helper/mongoDB');
const httpStatus = require('http-status')

const userModel = db.users

exports.createUser = async (call, callback) => {

    try {
        let response = {};
        let password = call.request.password;

        const dbResponse = await userModel.create(call.request)

        if (dbResponse) {
            response.status = httpStatus.ok;
            response.message = `User has been created`;
        }
        return callback(null, response)

    } catch (error) {
        return callback(error);
    }
}

exports.readUserById = async (call, callback) => {
    try {
        let response = {}
        const dbResponse = await userModel.findById(call.request.id)
        if (dbResponse) {         //check if we can send the dbResponse directy to response instead of  this below method
            response.fullName = dbResponse.fullName;
            response.email = dbResponse.email;
            response.gender = dbResponse.gender;
            response.dob = dbResponse.dob;
            response.password = dbResponse.password;

        }

        return callback(null, response)
    } catch (error) {
        return callback(error)
    }
}

exports.readAllUsers = async (call, callback) => {
    try {
        let dbResponse = {};
        const response = await userModel.find(call.request)

if (response && response.length > 0) {
         dbResponse.details = response;
        }

        return callback(null, dbResponse)
    } catch (error) {
        return callback(error)
    }
}

exports.updateById = async (call, callback) => {
    let response = {};
    try {
        const id = call.request.id;
        const dbResponse = await userModel.findByIdAndUpdate(id, call.request)
        if (dbResponse) {
            response.status = httpStatus.OK;
            response.message = `Update successful`
        }
        return callback(null, response)
    } catch (error) {
        return callback(error)
    }
}

exports.deleteById = async (call, callback) => {
    let response = {}
    try {
        const dbResponse = await userModel.findByIdAndRemove(call.request.id);
        if (dbResponse) {
            response.status = httpStatus.OK;
            response.message = `Delete successful`
        }
        return callback(null, response)
    } catch (error) {
        return callback(error)
    }
}

