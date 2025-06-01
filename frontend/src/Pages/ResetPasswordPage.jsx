import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPasswordPage = () =>{
    const [searchParams ] = useSearchParams()
    const token = searchParams.get("token")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword ] = useState("")
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setError("passwords do not match")
            return
        }
        try {
            await axios.post("http://localhost:5000/api/admin/reset-password", {token, password})
            setMessage("password has been reset. You can now log in.")
            setError(null)
        } catch (error) {
            setError("Reset failed or token expired")
            setMessage(null)
        }
    }

    if(!token){
        return <p>Invalid or missing reset token.</p>
    }

    return (
        <div className="reset-password-page">
      <h3>Set New Password</h3>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="password" 
          placeholder="New password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Confirm new password" 
          value={confirmPassword} 
          onChange={e => setConfirmPassword(e.target.value)} 
          required 
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
    )

 }

 export default ResetPasswordPage