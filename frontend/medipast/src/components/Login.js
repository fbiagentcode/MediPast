import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
      const navigate = useNavigate();
   
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [message, setMessage] = useState('');
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Replace this with your own authentication logic
        if (username === 'admin' && password === 'password') {
          setMessage('Login successful!');
        } else {
          setMessage('Invalid username or password.');
        }
      };
    
      return (
        
        
        <div className="login-container">           
            
            <h2 className="heading">Welcome back </h2>
         
         <div className ="login">
         <h2 >Login your account</h2>
         </div> 
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Ex: John123"
            />
            
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="*******"

            />
            
            <button type="submit">Login</button>
            <p className="account">Create Account</p>
           
            <div className="button-container">
      <button className="create" onClick={() => navigate("/register-doctor")}>Doctor</button>
      <button className="create" onClick={() => navigate("/register-patient")}>Patient</button>
    </div>
           
          </form>
          {message && <p>{message}</p>}
        </div>
        
      );
    
    
    
       
}