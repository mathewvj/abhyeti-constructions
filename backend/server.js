const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const adminRoutes = require('./routes/adminRoutes')
const auth = require('./middleware/auth')
const projectRoutes = require('./routes/protectedRoutes')

dotenv.config()
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//routes


//DB connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"))
.catch(err => console.error("DB connection error",err))

app.use('/api/admin',adminRoutes)


app.get('/api/protected',auth, (req, res) =>{
    res.json({ message: 'Access granted', admin: req.admin})
})

app.use('/api/projects', projectRoutes)



//start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})