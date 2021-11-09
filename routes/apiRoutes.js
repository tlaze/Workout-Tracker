const db = require('../models');
const router = require('express').Router();
require('mongoose');


// getLastWorkout GET


// addExercise PUT
router.put('/api/workouts/:id', (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id,
        {$push: {exercise: req.body}},
        {new: true, runValidators: true })
    .then((data) => res.json(data))
    .catch((err) => {
        res.json(err);
    })
})


// createWorkout POST
router.post('/api/workouts', (req, res) => {
    db.Workout.create({})
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
});

// getWorkoutsInRange GET




module.exports = router;