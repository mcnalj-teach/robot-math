const express = require("express");

// derivRoutes is an instance of express Router.
// The router will be added as middle ware and will take control of requests starting with /derivatives
const derivativesRoutes = express.Router();

const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This is where I write all the route handlers.
derivativesRoutes.route("/session/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let sessionObj = req.body;
  db_connect.collection("topicSessions").insertOne(sessionObj, function (err, res) {
   if (err) throw err;
   response.json(res);
  });
});

derivativesRoutes.route("/topic/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  topicObj = req.body;
  db_connect.collection("units").update({unitNumber: 200}, { $push: {unitTopics: topicObj}}, function (err, res) {
   if (err) throw err;
   response.json(res);
  });
});

derivativesRoutes.route("/topic/:unitName").get(function (req, response) {
  console.log("got to the route");
  let db_connect = dbo.getDb();
  let myQuery = {unitName: req.params.unitName};
  console.log(myQuery);
  let projection = { _id: false, unitTopics: true}
  db_connect.collection("units")
    .findOne(myQuery, projection, function (err, res) {
      if (err) throw err;
      console.log(res);
      response.json(res);
  });
});



module.exports = derivativesRoutes;
