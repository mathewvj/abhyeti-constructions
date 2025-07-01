import React, { useState } from "react";
import axios from "axios";
import './ForgetPassword.css'

const ForgetPassword = ({ onClose }) =>{
    const [ email, setEmail ] = useState("")
    const [ message, setMessage ] = useState(null)
    const [ error, setError ] = useState(null)
    const [isUploading, setIsUploading ] = useState(false)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsUploading(true)
        try {
            await axios.post("https://abhyeti-constructions-backend.onrender.com/api/admin/request-reset-password",{ email })
            setMessage("If the email exists, a reset link has been sent")
            setError(null)
        } catch (error) {
            setError("Failed to send reset link. Please try again later.")
            setMessage(null)
        } finally{
          setIsUploading(false)
        }
    }

    return (
        <div className="forgot-password-modal">
      <button type="button" onClick={onClose}>Close</button>
      <h2>Forgot Password</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={isUploading}>{isUploading ? <span className='spinner'></span> : "Send Reset Link"}</button>
      </form>
    </div>
    )
}

export default ForgetPassword