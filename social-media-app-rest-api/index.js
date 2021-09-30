const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const nodemon = require('nodemon')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config()
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Mongodb Connection')
  },
)

mongoose.connection.on('error', (err) => {
  console.log('err', err)
})
mongoose.connection.on('connected', (err, res) => {
  console.log('mongoose is connected')
})

//middleware

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.get('/users', (req, res) => {
  res.send('Hey user')
})

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

app.listen(8800, () => {
  console.log('Backend Server Ready test')
})
