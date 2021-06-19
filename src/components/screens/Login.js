import React,{useState,useContext} from 'react'

import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const Signin =()=>{
    const{state,dispatch} =useContext(UserContext)


    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const history=new useHistory()
    const [loading,setLoading]=useState("Login")

    
    const Signin=()=>{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(email)){
           return M.toast({html:"email invalid",classes:"#e53935 red darken-1"})

        }
        
     
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"

            },
            body:JSON.stringify(
                {
                   
                    email,
                    password
                }
            )
        }).then(res=>{
            setLoading("loading")
            
    

            res.json().then(data=>{
                console.log(data)
                setLoading("loaing")
                if(data.error){
                    M.toast({html:data.error,classes:"#e53935 red darken-1"})
                   console.log(data.error)
                  
                   
                   setLoading("Login")
                }
                else{
                    localStorage.setItem("jwt" ,data.token)
                    localStorage.setItem("user" ,JSON.stringify(data.user))
                    dispatch({type:'USER',payload:data.user})
                    M.toast({html:"signin sucessfully",classes:"#00b0ff light-blue accent-3"})
                    history.push('/followpost')

                }
               
            })
           
        }
        )
       

    }








    return(
       <div style={{ backgroundColor: '#fafafa'}}>
           <div className="card my-card " style={{alignContent:"center"}}>
               <div className="brand-logo insta-size " >
                 <h1  style={{fontSize:"50px"}}>instagram</h1>  
               </div>
               <input  type="text" placeholder="email" className="input-color"
               value={email} 
               onChange={(e)=>setEmail(e.target.value)} >
                   
               </input>
               <input type="password" placeholder="password" className="input-color"
               value={password} 
               onChange={(e)=>setPassword(e.target.value)} >
                   
               </input>
               <button className="btn waves=effect #64b5f6 blue dark-1" style={{color:"white"}} onClick={Signin}>
                   {loading}
               </button>
               <br></br>
               <br></br>
               <br></br>
               <div className="strike">
   <span>or</span>
</div>
               <button className="btn-flat " style={{color:"#080099",fontSize: "13px" ,fontWeight: 'bold'}}>
               <i className="material-icons left">facebook</i> login with facebook 
               </button>
               <br>
               
               </br>
               <h6 style={{color:"#080099",fontSize: "13px" ,fontWeight: 'bold'}}>forget password</h6>
               <br></br>


           </div>
           <div className="card   my-card " style={{height:"60px",backgroundClip:"#ffffff"}}>
           <h6 style={{color:"black"}} > dont have account<Link to="/signup"><div style={{color:"blue"}}>signup</div> </Link></h6>
           

           </div>
       </div>
    );

}
export default Signin