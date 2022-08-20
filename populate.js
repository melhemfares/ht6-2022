require('dotenv').config()

const connectDB = require('./db/connect')
const Quiz = require('./models/Quiz')

const jsonProducts = require('./questions.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Quiz.deleteMany()
    await Quiz.create(jsonProducts)
    console.log('Database populated!')
  } catch (error) {
    console.log(error)
  }
}

start()