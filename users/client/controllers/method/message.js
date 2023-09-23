"use strict";
(() => {
  const messageClient = require("../../messsage-client");

  exports.createMessage = async (request, res) => {
    try {
      messageClient.create(request.body, (err, data) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    } catch (error) {
      res.send(`Error occured ${error}`);
    }
  };

  exports.readMessageById = async (request, res) => {
    try {
      messageClient.readById(request.body, (err, data) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    } catch (error) {
      res.send(`Error occured ${error}`);
    }
  };

  exports.updateMessageById = async (request, res) => {
    try {
      messageClient.updateById(request.body, (err, data) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    } catch (error) {
      res.send(`Error occured ${error}`);
    }
  };

  exports.deleteMessageById = async (request, res) => {
    try {
      messageClient.deleteById(request.body, (err, data) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    } catch (error) {
      res.send(`Error occured ${error}`);
    }
  };
})();
