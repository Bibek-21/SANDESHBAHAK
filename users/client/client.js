"use strict";
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const dotenv = require('dotenv');

(() => {
  const filePath =`${__dirname}`
  const userPath =`./../common/user-proto/simpleCrud.rpc.proto`   //if the proto is in the common folder outside the directory
const messagePath =`./../common/message-proto/message.rpc.proto`
  const userProtoPath = `${filePath}/${userPath}`
  const messageProtoPath = `${filePath}/${messagePath}`

  const envPath=`${__dirname}/config/config.env`
  dotenv.config({ path: envPath })

  const userPortFromGrpc = process.env.USERPORTFROMGRPC;
  const messagePortFromGrpc = process.env.MESSAGEPORTFROMGRPC;


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

  const userProtoDefinition = grpc.loadPackageDefinition(userPackageDefinition);
  const messageProtoDefinition = grpc.loadPackageDefinition(messagePackageDefinition);

  const userCrudService = userProtoDefinition.example.simpleCrud.rpc.userCrudService;
  const messageCrudService = messageProtoDefinition.user.message.rpc.messageCrudService;

  const userClient = new userCrudService(
    `localhost:${userPortFromGrpc}`,
    grpc.credentials.createInsecure()
  );

  const messageClient = new messageCrudService(
    `localhost:${messagePortFromGrpc}`,
    grpc.credentials.createInsecure()
  );

  module.exports = {userClient,messageClient}

})();
