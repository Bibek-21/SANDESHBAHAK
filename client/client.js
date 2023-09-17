const grpc= require('@grpc/grpc-js');
const protoLoader= require('@grpc/proto-loader');


const filePath =`${__dirname}`
const tempPath =`../proto/simpleCrud.rpc.proto`
const protoPath= `${filePath}/${tempPath}`

const packageDefinition = protoLoader.loadSync(protoPath,{
    keepCase:true,
    longs:'string',
    defaults:true
})

const protoDefinition = grpc.loadPackageDefinition(packageDefinition)

const simpleCrudService = protoDefinition.example.simpleCrud.rpc.userCrudService;

const userClient = new simpleCrudService(
    'localhost:3000',
    grpc.credentials.createInsecure()
)

module.exports = userClient