import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Styles/Adminlogin.css"

function AdminLogin(){

const [user,setUser] = useState("");
const [pass,setPass] = useState("");

const navigate = useNavigate();

const login = (e)=>{

e.preventDefault();

if(user==="Surya" && pass==="surya123"){
localStorage.setItem("role","admin");
navigate("/home");
}

}

return(

<div className="login-container">

<form className="login-box" onSubmit={login}>

<h2>Admin Login</h2>

<input type="text" placeholder="Username"
onChange={(e)=>setUser(e.target.value)}/>

<input type="password" placeholder="Password"
onChange={(e)=>setPass(e.target.value)}/>

<button type="submit">Login</button>

</form>

</div>

)

}

export default AdminLogin;