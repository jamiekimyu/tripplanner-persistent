/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');

var Day = db.define('day', {
  number: Sequelize.INTEGER
},
  {
    hooks: {
      beforeDestroy: function(currentDay){
       return Day.findAll()
        .then(days => {
          let updateDays = [];
          days.forEach(day =>{
            if(day.number > currentDay.number){
              let newNum = day.number - 1;
              updateDays.push(day.update({
                number: newNum
              }))
            }
          })
          return Promise.all(updateDays);
        })
         .catch(console.error)
      
       }
    } 
});

module.exports = Day;
