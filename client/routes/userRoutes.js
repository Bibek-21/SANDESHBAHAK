const express = require('express');
(() => {
    const controller = require('../controllers/index')

    const router = express.Router()

    router.post('/createusers', controller.user.createUsers);
  



    module.exports = router;
})();