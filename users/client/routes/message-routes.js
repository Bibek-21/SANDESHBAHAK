const express = require("express");
(() => {
  const controllers = require("../controllers/method/index");
  const { protect } = require("../middleware/auth");
  const router = express.Router();

  router.use(protect);
  router.post("/createmessages", controllers.messageMethods.createMessage);
  router.get("/readmessagebyid", controllers.messageMethods.readMessageById);
  router.put(
    "/updatemessagebyid",
    controllers.messageMethods.updateMessageById
  );
  router.delete(
    "/deletemessagebyid",
    controllers.messageMethods.deleteMessageById
  );

  module.exports = router;
})();
