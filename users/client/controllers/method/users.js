"use strict";
(() => {
  const userClient = require("../../client");

  exports.createUser = async (request, res) => {
    try {
      userClient.create(request.body, (err, data) => {
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

  exports.readAllUsers = async (request, res) => {
    try {
      userClient.readAll(
        request, //this must be taken from .rpc.proto service rpc name
        (err, data) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(data);
          }
        }
      );
    } catch (error) {
      res.send(`Error occured ${error}`);
    }
  };

  exports.readUserById = async (request, res) => {
    try {
      userClient.readById(request.body, (err, data) => {
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

  exports.updateUserById = async (request, res) => {
    try {
      userClient.updateById(request.body, (err, data) => {
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

  exports.deleteUserById = async (request, res) => {
    try {
      userClient.deleteById(request.body, (err, data) => {
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
