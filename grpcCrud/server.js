const express = require('express');
const dotenv = require('dotenv')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')


const envPath=`${__dirname}/.env`
dotenv.config({path:envPath})
app = express();
app.use(express.json())
const userPort = process.env.USERPORT;
const messagePort = process.env.MESSAGEPORT;


const filePath =`${__dirname}`
const userPath =`./../common/userProto/simpleCrud.rpc.proto` // if the proto is in common folder
// const tempPath =`./proto/simpleCrud.rpc.proto`  //incase you want to dockerize this you need the proto within the same directory
const messagePath =`./../common/messageProto/messageCrud.rpc.proto`

const userProtoPath= `${filePath}/${userPath}`
const messageProtoPath = `${filePath}/${messagePath}`

const userPackageDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  longs: 'string',
  defaults: true,
})
const messagePackageDefinition = protoLoader.loadSync(messageProtoPath, {
  keepCase: true,
  longs: 'string',
  defaults: true,
})

const server = new grpc.Server()

const userProto = grpc.loadPackageDefinition(userPackageDefinition)
const messageProto = grpc.loadPackageDefinition(messagePackageDefinition)


const userService = require('./controllers/user.js');
const messageService = require('./controllers/message.js')

const userServer =server.addService(userProto.example.simpleCrud.rpc.userCrudService.service, {
  create: userService.createUser,
  readById:userService.readUserById,
  readAll:userService.readAllUsers,
  updateById:userService.updateById,
  deleteById:userService.deleteById
  
})

const messageServer = server.addService(messageProto.example.messageCrud.rpc.messageCrudService.service,{
  createMessage: messageService.createMessage,
  readMessageById:messageService.readMessageById,
  updateMessageById:messageService.updateById,
  deleteMessageById:messageService.deleteById
})
 

userServer.bindAsync(
  `${process.env.GRPC_HOST}:${userPort}`,
  grpc.ServerCredentials.createInsecure(),
  (err, userPort) => {
    if (err) {
      console.error(`User Server error: ${err.message}`);
    } else {
      console.log(`User Server bound on port: ${userPort}`);
      server.start();
    }
  }
);

messageServer.bindAsync(
  `${process.env.GRPC_HOST}:${messagePort}`,
  grpc.ServerCredentials.createInsecure(),
  (err, messagePort) => {
    if (err) {
      console.error(`Message Server error: ${err.message}`);
    } else {
      console.log(`Message Server bound on port: ${messagePort}`);
      server.start();
    }
  }
);
