const express = require('express');
(() => {
    const controllers = require('../controllers/method/index')
const {protect} = require('')
    const router = express.Router()

    router.use(protect)
    router.post('/createmessages', controllers.userControllers.createUser);
    router.get('/readuserbyid',controllers.userControllers.readById);
    router.get('/readallusers',controllers.userControllers.readAllUsers);
    router.put('/updateuserbyid',controllers.userControllers.updateById);
    router.delete('/deleteuserbyid',controllers.userControllers.deleteById);
  



    module.exports = router;
})();