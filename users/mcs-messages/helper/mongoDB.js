
(()=>{
  const mongoose= require('mongoose');
const config= require('../services/config/config')
let db={}

db.mongoose=mongoose;
db.URI= config.URI;
db.messages= require('../models/message')(mongoose)     

db.mongoose
.connect(db.URI)
.then(() => {
  console.log("Connected to the database!");
})
.catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});
module.exports= db

})();