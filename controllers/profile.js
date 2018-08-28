// Require express
var express = require('express');

// Declare a new router
var router = express.Router();

var db = require('../models');

// Get the authorization helper function
var loggedIn = require('../middleware/loggedIn')

// Define routes
router.get('/', loggedIn, function(req, res){
  res.render('profile/index');
});

router.get('/addworkout', loggedIn, function(req, res){
  res.render('profile/addworkout');
});

router.get('/edit', loggedIn, function(req, res){
  res.render('profile/edit');
});

router.post('profile', loggedIn, function(req, res){
  db.workout.create({
    where: {Exercise: req.body.name, Weight: req.body.weight, Sets: req.body.sets, Reps: req.body.reps},
    defaults: req.body
  })
  res.render('profile');
});

module.exports = router;
