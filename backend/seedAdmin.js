const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const Admin = require('./models/Admin')

dotenv.config()

const seedAdmin = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected DB')

        const email = 'admin@gmail.com'
        const password = 'admin123'

        const exisiting = await Admin.findOne({ email })
        if(exisiting){
            console.log('Admin already exists')
            process.exit()
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newAdmin =  new Admin({
            email,
             password: hashedPassword
        })
        await newAdmin.save()
        console.log("Admin created successfully")
        process.exit()
    } catch (error) {
        console.error('Error seedind admin', error.message)
        process.exit()
    }
}

seedAdmin()