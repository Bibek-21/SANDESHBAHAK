"use strict";
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const dotenv = require('dotenv');

(() => {
  const filePath =`${__dirname}`
  const userPath =`./../common/user-proto/simpleCrud.rpc.proto`   //if the proto is in the common folder outside the directory
  
  const userProtoPath = `${filePath}/${userPath}`

  const envPath=`${__dirname}/config/config.env`
  dotenv.config({ path: envPath })

  const userPortFromGrpc = process.env.USERPORTFROMGRPC;


  const userPackageDefinition = protoLoader.loadSync(userProtoPath, {
    keepCase: true,
    longs: 'string',
    defaults: true,
  })

 
  const userProtoDefinition = grpc.loadPackageDefinition(userPackageDefinition);

  const userCrudService = userProtoDefinition.example.simpleCrud.rpc.userCrudService;

  const userClient = new userCrudService(
    `0.0.0.0:${userPortFromGrpc}`,
    grpc.credentials.createInsecure()
  );



  module.exports = userClient

})();
