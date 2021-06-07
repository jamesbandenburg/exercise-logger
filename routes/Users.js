const express = require('express');
const router = express.Router()
const config = require('config')
const { check, validationResult } = require('express-validator')
const Users = require('../models/Users')

// Get all registered users

router.get('/', async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})


// Add new user

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const { name, email, password } = req.body

    try {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ msg: "Invalid request, please check all fields are correctly filled in" })
        }
        let user = await Users.findOne({ email: email })
        if (user) {
            return res.status(400).json({ msg: "User already exists" })
        };
            user = new Users({
                name: name,
                email: email,
                password: password
            })
            
        await user.save()
        res.json(user).send()
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ msg: err.message })
    }
})


module.exports = router