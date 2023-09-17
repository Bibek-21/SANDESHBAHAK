"use strict";
const grpc = require('@grpc/grpc-js');
const protoLoader= require('@grpc/proto-loader');
const dotenv= require('dotenv');

(()=>{

 const filePath =`${__dirname}`
    const testPath= `./../common/proto/simpleCrud.rpc.proto`
    const protoPath= `${filePath}/${testPath}`
    const envPath=`${__dirname}/.env`
    dotenv.config({path:envPath})
    const portFromGrpc= process.env.PORTFROMGRPC;


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

    module.exports=userClient

})();
