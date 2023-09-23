const express = require("express");
const dotenv = require("dotenv");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const envPath = `./services/config/config.env`;
dotenv.config({ path: envPath });

app = express();
app.use(express.json());
const userPort = process.env.PORT;


const filePath = `${__dirname}`;
const userPath =`./../common/user-proto/simpleCrud.rpc.proto` // if the proto is in common folder
// const userPath = `./userProto/simpleCrud.rpc.proto`; //incase you want to dockerize this you need the proto within the same directory

const userProtoPath = `${filePath}/${userPath}`;

const userPackageDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  longs: "string",
  defaults: true,
});

const server = new grpc.Server();

const userProto = grpc.loadPackageDefinition(userPackageDefinition);

const userService = require("./modules/user-modules/user.js");

server.addService(userProto.example.simpleCrud.rpc.userCrudService.service, {
  create: userService.createUser,
  readById: userService.readUserById,
  readAll: userService.readAllUsers,
  updateById: userService.updateById,
  deleteById: userService.deleteById,
});

server.bindAsync(
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
