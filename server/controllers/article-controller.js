var Article = require("../models/Article");

module.exports = {
  // this method handles finding all articles in the db
  find: function(req, res) {
    console.log("Get saves from db");
    Article.find().then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  },
  // this method handles adding new articles to the db
  insert: function(req, res) {
    console.log("add saved to db");
    console.log("req.body: ", req.body);
    Article.create(req.body).then(function(doc) {
      res.json(doc);
      console.log("doc: ", doc);
    }).catch(function(err) {
      res.json(err);
    });
  },
  // this method handles deleting articles from the db
  delete: function(req, res) {
    console.log("Delete save from db");
    Article.remove({
      _id: req.params.id
    }).then(function(doc) {
      res.json(doc);
      console.log("doc: ", doc);
    }).catch(function(err) {
      res.json(err);
    });
  }
};