//this file offers a set of routes for displaying and saving data to the user list in db
//require dependencies
// =============================================================
var path = require("path");

//require model
// =============================================================
var db = require("../models");

// User Routes
// =============================================================
module.exports = function (app) {
     //GET route for getting all of the users data
     app.get("/usersList/", function (req, res) {
        db.usersList.findAll({})
             .then(function (dbUsers) {
                  res.json(dbUsers);
             });
   });

   // POST route for saving a new user 
   app.post("/usersList", function (req, res) {
        db.usersList.create({
             userNickname: req.body.userNickname,
             userEmail: req.body.userEmail,
             userUID: req.body.userUID              
        })
             .then(function (dbUsers) {
                  res.json(dbUsers);
             });
   });

      // DELETE route for deleting users
      app.delete("/usersList/:id", function (req, res) {
          db.usersList.destroy({where: {id: req.params.id}})
               .then(function (dbUsers) {
                    res.json(dbUsers);
               });
     });

     app.put("/usersList/:id", function (req, res) {
          db.usersList.update(req.body, { where: { id: req.params.id }})
          .then(function (dbUsers) {
              res.json(dbUsers);
          });
      });
}