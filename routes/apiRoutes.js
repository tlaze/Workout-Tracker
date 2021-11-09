const Workout = require('../models/workout.js');
const router = require('express').Router();


// getLastWorkout GET
// Gets the last workout that is in the database and displays it on the home screen
router.get('/api/workouts', (req, res) => {
    Workout.aggregate([{
        $addFields: {
            totalDuration: { $sum: '$exercises.duration' }
        },
    }])
    .then((data) => {
        // console.log('LastWorkout', data);
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    })
})

// addExercise PUT
// Adds a new exercise to each workout collection
router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id,
        { $push: {exercises: req.body }},
        { new: true, runValidators: true }
    )
    .then((data) => res.json(data))
    .catch((err) => {
        res.json(err);
    })
})


// createWorkout POST
// Creates a new workout
router.post('/api/workouts', (req, res) => {
    Workout.create({}).then((data) => res.json(data))
    .catch((err) => {
        res.json(err);
    });
});

// getWorkoutsInRange GET
// Gets all the workout info from the last 7 days
router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([{
        $addFields: {
            totalDuration: { $sum: '$exercises.duration' },
            totalWeight: { $sum: '$exercises.weight' }
        }
    }])
    .limit(7)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
});

module.exports = router;