const http = require('http')

const { Server } = require('socket.io')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Threat = require('./models/Threat')
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

        const { activity } = req.body

        // Send activity to AI engine
        const aiResponse = await axios.post(
            'http://127.0.0.1:5001/detect',
            {
                activity
            }
        )

        // Save threat log in MongoDB
        await Threat.create({

            activity,

            result: aiResponse.data.result

        })

        // Send result to frontend
        res.json({
            result: aiResponse.data.result
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            error: 'Server Error'
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

        const user = await User.findOne({ email })

        if (!user) {

            return res.status(400).json({
                message: 'User not found'
            })
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        )

        if (!isMatch) {

            return res.status(400).json({
                message: 'Invalid Password'
            })
        }

        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET,

            { expiresIn: '1d' }
        )

        res.json({
            token
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            error: error.message
        })
    }
})

app.post('/scan-url', async (req, res) => {

    try {

        const { url } = req.body

        const suspiciousWords = [
            'login',
            'verify',
            'bank',
            'secure',
            'update',
            'free',
            'bonus'
        ]

        let risk = 0

        suspiciousWords.forEach(word => {

            if (url.includes(word)) {

                risk += 20
            }
        })

        if (!url.startsWith('https')) {

            risk += 30
        }

        let result = 'Safe Website'

        if (risk >= 50) {

            result = '⚠ Phishing Website Detected'
        }

        res.json({
            result
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            error: error.message
        })
    }
})