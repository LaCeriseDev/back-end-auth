//modules
const express = require('express')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const {checkUser, requireAuth} = require('./middleware/auth.middleware')

require('dotenv').config({path:'./config/.env'})
require('./config/db')

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// jwt
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// route
app.use('/api/user', userRoutes)

// server
app.listen(process.env.PORT, () => {
  console.log('listening on port '+ process.env.PORT)
})
