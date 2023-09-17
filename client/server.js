const express= require('express');
const mainroute= require('./routes/index')
const dotenv= require('dotenv');
const bodyParser = require('body-parser');
const envPath=`${__dirname}/.env`

dotenv.config({path:envPath})

const app = express();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());

app.use('/',mainroute)
app.listen(port,()=>{

    console.log(`listening to port ${port}`);
})