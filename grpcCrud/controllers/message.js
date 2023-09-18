const db = require('../helper/mongoDB');
const httpStatus = require('http-status')

const messageModel = db.messages

exports.createMessage = async (call, callback) => {

    try {
        let response = {};

        const dbResponse = await messageModel.create(call.request)

        if (dbResponse) {
            response.status = httpStatus.ok;
            response.message = `Message has been created`;
        }
        return callback(null, response)

    } catch (error) {
        return callback(error);
    }
}

exports.readMessageById = async (call, callback) => {
    try {
        let response = {}
        const dbResponse = await messageModel.findById(call.request.id)
        if (dbResponse) {         //check if we can send the dbResponse directy to response instead of  this below method
            response.message = dbResponse.message;
            response.senderId = dbResponse.senderId;
            response.receiverId = dbResponse.receiverId;
           
        }

        return callback(null, response)
    } catch (error) {
        return callback(error)
    }
}



exports.updateById = async (call, callback) => {
    let response = {};
    try {
        const id = call.request.id;
        const dbResponse = await messageModel.findByIdAndUpdate(id, call.request)
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
        const dbResponse = await messageModel.findByIdAndRemove(call.request.id);
        if (dbResponse) {
            response.status = httpStatus.OK;
            response.message = `Delete successful`
        }
        return callback(null, response)
    } catch (error) {
        return callback(error)
    }
}

