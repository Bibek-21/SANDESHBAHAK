const express = require("express");
const dotenv = require("dotenv");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const envPath = `./services/config/config.env`;
dotenv.config({ path: envPath });

app = express();
app.use(express.json());
const port = process.env.PORT;
const filePath = `${__dirname}`;

const messagePath = `../common/message-proto/message.rpc.proto`; // if the proto is in common folder
// const messagePath = `./messageProto/simpleCrud.rpc.proto`; //incase you want to dockerize this you need the proto within the same directory

const messageProtoPath = `${filePath}/${messagePath}`;

const userPackageDefinition = protoLoader.loadSync(messageProtoPath, {
  keepCase: true,
  longs: "string",
  defaults: true,
});

const server = new grpc.Server();

const messageProto = grpc.loadPackageDefinition(userPackageDefinition);

const messageService = require("./modules/message-modules/message.js");

server.addService(messageProto.user.message.rpc.messageCrudService.service, {
  create: messageService.createMessage,
  readById: messageService.readMessageById,
  updateById: messageService.updateMessageById,
  deleteById: messageService.deleteMessageById,
});

server.bindAsync(
  `${process.env.GRPC_HOST}:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (err, userPort) => {
    if (err) {
      console.error(`message Server error: ${err.message}`);
    } else {
      console.log(`message Server bound on port: ${userPort}`);
      server.start();
    }
  }
);
