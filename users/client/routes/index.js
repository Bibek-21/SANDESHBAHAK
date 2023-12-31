
"use strict";



(() => {
    const express = require('express');
    const router = express.Router();
    const userRoutes = require("./user-routes");
    const messageRoutes = require("./message-routes");
    const authRoutes = require('./auth-routes')

    router.use("/users",userRoutes);
    router.use("/messages",messageRoutes);
    router.use('/auth',authRoutes);

    module.exports = router;
})();