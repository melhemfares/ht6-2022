require('dotenv').config();
require('express-async-errors');

const express = require('express');
const connectDB = require('./db/connect');
const app = express();

app.use(express.json());

//middleware
const NotFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authenticateUser = require('./middleware/authentication')

//routes
const authRouter = require('./routes/auth')

//test route
app.get('/test', (req, res) => {
  res.send('ht6 api')
})

app.use('api/auth', authRouter)

app.use(errorHandlerMiddleware)
app.use(NotFoundMiddleware)

//app listen setup
const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start();
