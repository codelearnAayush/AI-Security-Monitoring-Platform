const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./models/User')

require('dotenv').config()
const mongoose = require('mongoose')

const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

app.use(cors())
app.use(express.json())

app.post('/check-activity', async (req, res) => {

    try {

        const response = await axios.post(
            'http://127.0.0.1:5001/detect',
            {
                activity: req.body.activity
            }
        )

        res.json(response.data)

    } catch (error) {

        res.status(500).json({
            error: 'AI Server Error'
        })
    }
})

app.listen(5000, () => {
    console.log('Backend running on port 5000')
})

app.post('/signup', async (req, res) => {

    try {

        const { name, email, password } = req.body

        // Check existing user
        const existingUser = await User.findOne({ email })

        if (existingUser) {

            return res.status(400).json({
                message: 'User already exists'
            })
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()

        res.json({
            message: 'User registered successfully'
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })
    }
})

app.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body

        // Find user
        const user = await User.findOne({ email })

        if (!user) {

            return res.status(400).json({
                message: 'User not found'
            })
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(
            password,
            user.password
        )

        if (!isMatch) {

            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }

        // Generate token
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        res.json({
            token,
            user: {
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })
    }
})