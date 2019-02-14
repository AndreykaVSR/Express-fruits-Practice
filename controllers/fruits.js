const express = require('express')
const router = express.Router()
const Fruits = require('../models/fruit')


// This is the index route to show all the fruits
router.get('/', function(req, res){
    // We need to query the database to get all of the fruits
    Fruits.find({}, function(error, fruits){
        if(error){
            console.log(error)
        } else {
            console.log(fruits, 'This is all the fruits')
            res.render('index', {fruits})
        }
    })
})

router.delete('/:id', function(req, res){
    console.log(req.params.id, 'Id in the delete route')
    Fruits.findByIdAndRemove(req.params.id, function(error, deletedFruit){
        if(error){
            console.log(error)
        } else {
            console.log(deletedFruit, 'This Fruit was deleted')
            res.redirect('/fruits')
        }
    })
})

// This is the route to serve a new fruit form page
router.get('/new', function(req, res){
    res.render('new')
})

// This is the route to post a new fruit to the Database
router.post('/', function(req, res){
    // We need some database logic here
    // But first we'll need to check req.body to make sure our data is
    // coming to the controller properly
    console.log(req.body, 'This is where all our fruits info lives')

    // This is where we'll handle our checkbox data
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    // Now we can create a fruit using the Mongoose create method
    Fruits.create(req.body, function(error, createdFruit){
        // Handle that error ... if there is one that is haha
        if(error){
            console.log("Something is wrong", error)
        } else {
            console.log(createdFruit)
            // let's see all the fruits now
            res.redirect('/fruits')
        }
    })
})


module.exports = router