var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Place = require('../../models/place');


router.get('/hotels', function(req, res, next){
    Hotel.findAll({
        include: [Place]
    })
    .then(function(hotels){
        res.json(hotels)
    })
    .catch(next)
});

router.get('/restaurants', function(req, res, next){
    Restaurant.findAll({
        include: [Place]
    })
    .then(function(restaurants){
        res.json(restaurants)
    })
    .catch(next)
});

router.get('/activities', function(req, res, next){
    Activity.findAll({
        include: [Place]
    })
    .then(function(activities){
        res.json(activities)
    })
    .catch(next)
});

module.exports = router;