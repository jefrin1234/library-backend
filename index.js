require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const app =  express()
const port = 3000
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authorRoutes = require('./routes/authorRoutes')
const bookRoutes = require('./routes/bookRoutes')
const signUpRoutes = require('./routes/signUpRoutes')

const loginRoutes = require('./routes/loginRoutes')

const authRoutes = require('./routes/authRoutes')

const logoutRoutes = require('./routes/logoutRoutes')
app.use(cors({
  credentials : true,
  origin : true

}))
app.use(express.json())
app.use(cookieParser())


app.use('/authors',authorRoutes)
app.use('/books',bookRoutes)
app.use('/signup',signUpRoutes)
app.use('/login',loginRoutes)
app.use('/verify',authRoutes)
app.use('/logout',logoutRoutes)
app.listen(port,()=>{
  console.log('server running on port 3000')
})

main().then(()=>console.log('connected')).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  
}