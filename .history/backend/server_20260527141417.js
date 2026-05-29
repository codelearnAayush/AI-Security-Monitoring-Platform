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

