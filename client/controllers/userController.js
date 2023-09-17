
"use strict";

(()=>{
    const userClient= require('../client');

    exports.createUsers= async(req,res)=>{
try{
     await userClient.create(req.body,(err,data)=>{
        if(err){
            res.status(400).send(err)
        }

        else{

            res.status(200).send(data)
        }



    })

}
catch(error){
res.status(400).send(`Error creating the user ${error}`)
}
    }
})();