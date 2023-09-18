const express = require('express');
const dotenv = require('dotenv')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')


const envPath=`${__dirname}/.env`
dotenv.config({path:envPath})
app = express();
app.use(express.json())
const port = process.env.PORT;


const filePath =`${__dirname}`
const tempPath =`./../common/proto/simpleCrud.rpc.proto`
// const tempPath =`./proto/simpleCrud.rpc.proto`  //incase you want to dockerize this you need the proto within the same directory


const protoPath= `${filePath}/${tempPath}`


const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: 'string',
  defaults: true,
})

const server = new grpc.Server()

const simpleProto = grpc.loadPackageDefinition(packageDefinition)

const userService = require('./controllers/user.js');
const messageService = require('./controllers/message.js')

server.addService(simpleProto.example.simpleCrud.rpc.userCrudService.service, {
  create: userService.createUser,
  readById:userService.readUserById,
  readAll:userService.readAllUsers,
  updateById:userService.updateById,
  deleteById:userService.deleteById
  
})

server.addService(simpleProto.example.simpleCrud.rpc.messageCrudService.service,{
  create: messageService.createUser,
  readById:messageService.readUserById,
  readAll:messageService.readAllUsers,
  updateById:messageService.updateById,
  deleteById:messageService.deleteById
})
 
server.bindAsync(
  `${process.env.GRPC_HOST}:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(`Server error: ${err.message}`);
    } else {
      console.log(`Server bound on port: ${port}`);
      server.start();
    }
  }
);
