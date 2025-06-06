const nodemailer = require('nodemailer')

exports.sendContactMessage = async(req, res) =>{
    const { name, email, phone, message } = req.body

    if(!name || !email || !message ){
        return res.status(400).json({ message: 'Please fill all required fields'})
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            }
        })

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: 'New Contact Form submission',
            html:`
                <h3>New Message from ${name}</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        }

        await transporter.sendMail(mailOptions)
        res.status(200).json({ message: 'Message sent successfully!'})
    } catch (error) {
        console.error('Email error:',error)
        res.status(500).json({ message: 'Error sending message:', error: error.message})
    }
}
