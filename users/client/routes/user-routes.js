const express = require('express');
(() => {
    const controllers = require('../controllers/method/index')

    const router = express.Router()

    router.post('/createusers', controllers.userMethods.createUser);
    router.get('/readuserbyid',controllers.userMethods.readUserById);
    router.get('/readallusers',controllers.userMethods.readAllUsers);
    router.put('/updateuserbyid',controllers.userMethods.updateUserById);
    router.delete('/deleteuserbyid',controllers.userMethods.deleteUserById);
  



    module.exports = router;
})();