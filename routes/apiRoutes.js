const db = require('../models/workout.js');
const router = require('express').Router();
require('mongoose');


// getLastWorkout GET
router.get('/api/workouts', (req, res) => {
    db.aggregate([{
        $addFields: {
            totalDuration: { $sum: '$exercise.duration' }
        },
    }])
    .then((data) => {
        console.log('LastWorkout', data);
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    })
})

// addExercise PUT
router.put('/api/workouts/:id', (req, res) => {
    console.log("PUT route", req.params);
    db.findByIdAndUpdate(req.params.id,
        {$push: {exercise: req.body}},
        { new: true, runValidators: true })
    .then((data) => res.json(data))
    .catch((err) => {
        res.json(err);
    })
})


// createWorkout POST
router.post('/api/workouts', (req, res) => {
    db.create({})
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
});

// getWorkoutsInRange GET
router.get('/api/workouts/range', (req, res) => {
    db.aggregate([{
        $addFields: {
            totalDuration: { $sum: '$exercise.duration' },
            totalWeight: { $sum: '$exercise.weight' }
        }
    }])
    .limit(7)
    .then((data) => {
        console.log('RangeRoute', data);
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    })
})



module.exports = router;