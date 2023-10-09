const express = require("express");
const dotenv = require("dotenv");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const envPath = `./services/config/config.env`;
dotenv.config({ path: envPath });

app = express();
app.use(express.json());
const userPort = process.env.PORT||3001;
const grpcHost =process.env.GRPC_HOST||'0.0.0.0'

const filePath = `${__dirname}`;

const messagePath = `../common/message-proto/message.rpc.proto`; // if the proto is in common folder
// const messagePath = `./messageProto/simpleCrud.rpc.proto`; //incase you want to dockerize this you need the proto within the same directory

const messageProtoPath = `${filePath}/${messagePath}`;

const userPath =`./../common/user-proto/simpleCrud.rpc.proto` // if the proto is in common folder
// const userPath = `./userProto/simpleCrud.rpc.proto`; //incase you want to dockerize this you need the proto within the same directory

const userProtoPath = `${filePath}/${userPath}`;

const userPackageDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  longs: "string",
  defaults: true,
});


const messagePackageDefinition = protoLoader.loadSync(messageProtoPath, {
  keepCase: true,
  longs: "string",
  defaults: true,
});
const server = new grpc.Server();

const userProto = grpc.loadPackageDefinition(userPackageDefinition);

const messageProto = grpc.loadPackageDefinition(messagePackageDefinition);

const userService = require("./modules/user-modules/user.js");

const messageService = require("../mcs-messages/modules/message-modules/message.js");

server.addService(userProto.example.simpleCrud.rpc.userCrudService.service, {
  create: userService.createUser,
  readById: userService.readUserById,
  readAll: userService.readAllUsers,
  updateById: userService.updateById,
  deleteById: userService.deleteById,
});
server.addService(messageProto.user.message.rpc.messageCrudService.service, {
  create: messageService.createMessage,
  readById: messageService.readMessageById,
  updateById: messageService.updateMessageById,
  deleteById: messageService.deleteMessageById,
});

server.bindAsync(
  `${grpcHost}:${userPort}`,
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
