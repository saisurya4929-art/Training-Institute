import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Styles/Adminlogin.css"


function AdminLogin(){

const [user,setUser] = useState("");
const [pass,setPass] = useState("");
const navigate = useNavigate();

const login = (e)=>{
e.preventDefault();

if(user==="admin" && pass==="admin123"){
localStorage.setItem("role","admin");
navigate("/home");
}
};

return(

<div className="admin-container">

<div className="admin-card">

<h2>Admin Login</h2>

<form onSubmit={login}>

<input type="text" placeholder="Username"
onChange={(e)=>setUser(e.target.value)}/>

<input type="password" placeholder="Password"
onChange={(e)=>setPass(e.target.value)}/>

<button>Login</button>

</form>

</div>

</div>

);

}

export default AdminLogin;