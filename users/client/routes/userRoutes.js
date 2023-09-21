const express = require('express');
(() => {
    const controllers = require('../controllers/method/index')

    const router = express.Router()

    router.post('/createusers', controllers.userControllers.createUser);
    router.get('/readuserbyid',controllers.userControllers.readById);
    router.get('/readallusers',controllers.userControllers.readAllUsers);
    router.put('/updateuserbyid',controllers.userControllers.updateById);
    router.delete('/deleteuserbyid',controllers.userControllers.deleteById);
  



    module.exports = router;
})();