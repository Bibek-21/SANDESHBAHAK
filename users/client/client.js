"use strict";
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const dotenv = require('dotenv');

(() => {

  const filePath =`${__dirname}`
  // const userPath =`./../common/userProto/simpleCrud.rpc.proto`   //if the proto is in the common folder outside the directory
  //if the proto lies within the same directory 'client'
const userPath =`./userProto/simpleCrud.rpc.proto`  //incase you want to dockerize this you need the proto within the same directory

  const protoPath = `${filePath}/${userPath}`

  const envPath = `${__dirname}/.env`
  dotenv.config({ path: envPath })
  const portFromGrpc = process.env.PORTFROMGRPC;


  const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: 'string',
    defaults: true,
  })

  const protoDefinition = grpc.loadPackageDefinition(packageDefinition);

  const userCrudService = protoDefinition.example.simpleCrud.rpc.userCrudService;

  const userClient = new userCrudService(
    `localhost:${portFromGrpc}`,
    grpc.credentials.createInsecure()
  );

  module.exports = userClient

})();
