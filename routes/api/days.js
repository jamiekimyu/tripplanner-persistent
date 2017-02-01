var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Place = require('../../models/place');
var Day = require('../../models/day');


router.get('/', function(req, res, next){
    Day.findAll({})
    .then(days =>{
        res.send(days)
    })
    .catch(next)
});

router.get('/:number', function(req, res, next){
    Day.findOne({
        where: {number: req.params.number}
    })
    .then(day => {
        res.send(day)
    })
    .catch(next)

});

router.post('/:number', function(req, res, next){
    Day.create({
        number: req.params.number
    })
    .then(day => {
        res.send(day)
    })
    .catch(next)
});

router.put('/:number', function(req, res, next){
    
});

router.delete('/:number', function(req, res, next){
    Day.destroy({
        where: {number:req.params.number}
    })
    .then(day => {
        res.send('deleted')
    })
    .catch(next)
});

router.post('/:id/hotels', function(req, res, next){

});

router.post('/:id/restaurants', function(req, res, next){

});

router.post('/:id/activities', function(req, res, next){

});

module.exports = router;