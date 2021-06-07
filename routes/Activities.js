const express = require('express');
const router = express.Router();

const Activities = require('../models/Activities')


//GET request - get all user's activities

router.get('/', async (req, res) => {
    
    try {
        
        const activities = await Activities.find({ user: req.query.user }).sort({ date: -1 })
        if (!activities) {
            res.json({msg: "Nothing found. Go forth and exercise!" })
        }  
       
        res.json(activities).send()
    } catch (err) {
        res.send(err.message)
    }
})

// GET request - get single activity

router.get('/:id', async (req, res) => {
    try {
        const activity = await Activities.findById(req.params.id).exec()
        res.json(activity).send()
    } catch (error) {
        res.send(error.message)
    }
})

//POST request - add new activity

router.post('/', async (req, res) => {
    try {
        let activity = new Activities({
            user: req.body.user,
            type: req.body.type,
            date: req.body.date,
            duration: req.body.duration,
            location: req.body.location
        })
        await activity.save()
        res.json(activity).send()
    } catch (error) {
        res.send(error.message)
    }
})

//PUT request - edit existing activity

router.put('/:id', async (req, res) => {
    const { type, date, duration, location } = req.body
    const activityUpdates = {};
    if (type) {activityUpdates.type = type}
    if (date) {activityUpdates.date = date}
    if (duration) {activityUpdates.duration = duration}
    if (location) {activityUpdates.location = location}
    try {
        let activity = Activities.findById(req.params.id)
        if (!activity) {
            res.status(400).json({ msg: "Activity not found" })
        }
        activity = await Activities.findByIdAndUpdate(req.params.id, {
            $set: activityUpdates
        },
        {
            new: true
        })
        res.json(activity)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// DELETE request

router.delete('/:id', async (req, res) => {
    try {
        await Activities.findByIdAndRemove(req.params.id)
        res.json(`Successfully deleted`)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router
