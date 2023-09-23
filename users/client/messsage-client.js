"use strict";
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const dotenv = require('dotenv');

(() => {
  const filePath =`${__dirname}`
const messagePath =`./../common/message-proto/message.rpc.proto`

const messageProtoPath = `${filePath}/${messagePath}`

  const envPath=`${__dirname}/config/config.env`
  dotenv.config({ path: envPath })

  const messagePortFromGrpc = process.env.MESSAGEPORTFROMGRPC;


  

  const messagePackageDefinition = protoLoader.loadSync(messageProtoPath, {
    keepCase: true,
    longs: 'string',
    defaults: true,
  })

  const messageProtoDefinition = grpc.loadPackageDefinition(messagePackageDefinition);

  const messageCrudService = messageProtoDefinition.user.message.rpc.messageCrudService;

  

  const messageClient = new messageCrudService(
    `0.0.0.0:${messagePortFromGrpc}`,
    grpc.credentials.createInsecure()
  );

  module.exports = messageClient

})();
