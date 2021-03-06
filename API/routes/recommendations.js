var recombee = require("recombee-api-client");

const express = require("express");
const router = express.Router();

//const axios = require("axios");
const config = require("../config.json");

var rqs = recombee.requests;

var client = new recombee.ApiClient(
  config.keys.recombee_db,
  config.keys.recombee
);

router.get("/addBookmark", async (req, res) => {
  console.log("User ID: " + req.query.userId);
  console.log(req.query.category + " added.");

  let category = req.query.category;
  let itemId = category + "_" + req.query.itemId;
  let userId = req.query.userId;
  await client
    .send(new rqs.AddItem(itemId))
    .then(() => {
      client.send(
        new rqs.SetItemValues(itemId, {
          type: category,
        })
      );
    })
    .catch((error) => {
      if (error.statusCode == 409) {
        //ok
      } else {
        console.error(error);
      }
    });

  const rest = await client
    .send(
      new rqs.AddBookmark(userId, itemId, {
        // optional parameters:
        cascadeCreate: true, //will create user or item if missing in DB
      })
    )
    .then(() => {})
    .catch((error) => {
      if (error.statusCode == 409) {
        //ok
      } else {
        console.error(error);
      }
    });

  res.json("OK");
});

router.get("/removeBookmark", async (req, res) => {
  console.log("User ID: " + req.query.userId);
  console.log(req.query.category + " removed.");

  console.log(req.query.userId);
  let category = req.query.category;
  let itemId = category + "_" + req.query.itemId;
  let userId = req.query.userId;
  await client
    .send(new rqs.DeleteBookmark(userId, itemId))
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });

  res.json("OK");
});

router.get("/getBookmarks", async (req, res) => {
  console.log("Recieved bookmarks.");

  let userId = req.query.userId;
  await client
    .send(new rqs.ListUserBookmarks(userId))
    .then((rec) => {
      res.json(rec);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.get("/getRecommendations", async (req, res) => {
  console.log("Recommending: " + req.query.category + ".");

  let category = req.query.category;
  let userId = req.query.userId;
  let filter = "'type' == \"" + category + '" ';

  await client
    .send(
      new rqs.RecommendItemsToUser(userId, 18, {
        filter: filter,
        scenario: "homepage",
        returnProperties: true,
      })
    )
    .then((rec) => {
      res.json(rec);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
