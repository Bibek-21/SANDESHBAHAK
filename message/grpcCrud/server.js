const express = require('express');
const dotenv = require('dotenv')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')


const envPath=`${__dirname}/.env`
dotenv.config({path:envPath})
app = express();
app.use(express.json())
const messagePort = process.env.PORT;


const filePath =`${__dirname}`
// const tempPath =`./proto/messageCrud.rpc.proto`  //incase you want to dockerize this you need the proto within the same directory
const messagePath =`./../common/messageProto/messageCrud.rpc.proto`

const messageProtoPath = `${filePath}/${messagePath}`


const messagePackageDefinition = protoLoader.loadSync(messageProtoPath, {
  keepCase: true,
  longs: 'string',
  defaults: true,
})

const server = new grpc.Server()

const messageProto = grpc.loadPackageDefinition(messagePackageDefinition)


const messageService = require('./controllers/message.js')

server.addService(messageProto.demo.messageCrud.rpc.messageCrudService.service,{
  createMessage: messageService.createMessage,
  readMessageById:messageService.readMessageById,
  updateMessageById:messageService.updateById,
  deleteMessageById:messageService.deleteById
})
 



server.bindAsync(
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
