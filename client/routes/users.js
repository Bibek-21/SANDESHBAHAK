
const express= require('express');
(()=>{

const router=express.Router()
const controllers=require('../controllers/index')

router.post('/createuser',controllers.userControllers.createUser);
router.get('/readuserbyid',controllers.userControllers.readById);
router.get('/readallusers',controllers.userControllers.readAllUsers);
router.put('/updateuserbyid',controllers.userControllers.updateById);
router.delete('/deleteuserbyid',controllers.userControllers.deleteById);



module.exports=router
})();