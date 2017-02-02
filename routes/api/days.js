var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Place = require('../../models/place');
var Day = require('../../models/day');


router.get('/', function(req, res, next){
    Day.findAll({
        include: [Hotel, Restaurant, Activity],
        order: 'number ASC'
    })
    .then(days =>{
        console.log(days);
        res.send(days);
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
    Day.findOne({
        where: {number:req.params.number}
    })
    .then(day => {
        return day.destroy()
    })
    .then( () => {
        res.send('deleted')
    })
    .catch(next)
});

router.post('/:id/hotels', function(req, res, next){
    Day.findById(req.params.id)
    .then(day => {
        return day.update({
            hotelId: req.body.hotelId
        }).then(() => res.send())
    })
    .catch(next)
});

router.post('/:id/restaurants', function(req, res, next){
    Day.findById(req.params.id)
    .then(day => {
        return Restaurant.findById(req.body.restaurantId)
        .then(restaurant => {
            return day.addRestaurant(restaurant)
        })
        .then(() => res.send())
    })
    .catch(next)
});

router.post('/:id/activities', function(req, res, next){
    Day.findById(req.params.id)
    .then(day => {
        return Activity.findById(req.body.activityId)
        .then(activity => {
            return day.addActivity(activity)
        })
        .then(() => res.send())
    })
    .catch(next)
});

router.delete('/:id/hotels', function(req, res, next){
    Day.findById(req.params.id)
    .then(day => {
        return day.update({
            hotelId: null
        }).then(() => res.send())
    })
    .catch(next)
});

router.delete('/:id/restaurants', function(req, res, next){
    Day.findById(req.params.id)
    .then(day => {
        return Restaurant.findById(req.body.restaurantId)
        .then(restaurant => {
            return day.removeRestaurant(restaurant)
        })
        .then(() => res.send())
    })
    .catch(next)
});

router.delete('/:id/activities', function(req, res, next){
    Day.findById(req.params.id)
    .then(day => {
        return Activity.findById(req.body.activityId)
        .then(activity => {
            return day.removeActivity(activity)
        })
        .then(() => res.send())
    })
    .catch(next)
});
module.exports = router;