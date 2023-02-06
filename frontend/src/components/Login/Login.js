import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import App from "../../App"
import DashBoard from "../DashBoard/DashBoard"

import "./Login.css"
export default function Login() {
  // 
  const [loginUser, setLoginUser] = useState({ password: '', email_id: '' })
  const [IncorrectPasswordMsg, setIncorrectPasswordMsg] = useState('')
  const [IncorrectPassword, setIncorrectPassword] = useState(false)
  const [authenticateUser, setAuthenticateUser] = useState(false)
  let authenticateKar = false;
  const win=window.sessionStorage
  const { state } = useLocation();
  let registerLoginMessage;
  if (state!==null){
    registerLoginMessage=state.messageLogin
  }
   
  const navigate = useNavigate()

  const handleLoginInput = (e) => {
    const { name, value } = e.target
    setLoginUser({ ...loginUser, [name]: value })

  }
  const loginSubmit = (e) => {
    e.preventDefault();
    const { password, email_id } = loginUser
    axios.post("http://localhost:8080/login", loginUser).then((res) => {
      if (res.data.length>0)
      {
        navigate('/dashboard')
      }
      else{
        alert("Invalid Email Id or Password")
      }

    })
  }
  return (
    <div >
      <div>
        <div class="navBar">
        <h2 className="HeaderWHMgmt">WareHouse Management</h2>
        </div>
        <h1 className="loginHeader">Login</h1>
        {registerLoginMessage && 
        <h2  style={{marginLeft:'447px',fontSize:'22px',marginTop:'20px',padding:'7px',color:'blue',border:'3px solid green',width:'27%',}}>Successfuly registered..Please Login to continue</h2> 
        // <h2>{registerLoginMessage}</h2>
      }
        
        <div className="loginForm" >
          {/* <h1 className="loginAddHeader"> Add Contact</h1> */}
          <form onSubmit={loginSubmit}>

            <h4 className="loginAddEmail"> Email:  </h4>
            <input onChange={handleLoginInput} name="email_id" value={loginUser.email_id} id="email" className="loginInputEmail" type="text" placeholder="Enter your Email Id" required></input>
            <br></br>
            <h4 className="loginAddName">  Password: </h4>
            <input onChange={handleLoginInput} name="password"  value={loginUser.password} id='name' className="loginInputName" type="password" placeholder="Enter your name" required></input>
            <br></br>
            {IncorrectPassword && <h2 style={{marginLeft:'447px',fontSize:'18px',marginTop:'20px',padding:'7px',color:'red', border:'3px solid red'}}>{IncorrectPasswordMsg}</h2>}
            <button className="loginButton">Login</button>
          </form>
        </div>

      </div>

    </div>

  )

}