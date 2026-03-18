import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../Styles/Studentlogin.css";

function StudentLogin(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const navigate = useNavigate();

const login = (e)=>{
e.preventDefault();

if(email==="student@gmail.com" && password==="123"){
localStorage.setItem("role","student");
navigate("/dashboard");
}
};

return(

<div className="login-container">

<div className="login-card">

<h2>Student Login</h2>

<form onSubmit={login}>

<input type="email" placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}/>

<input type="password" placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}/>

<button>Login</button>

</form>

<p>
Admin? <Link to="/admin">Login here</Link>
</p>

</div>

</div>

);

}

export default StudentLogin;
