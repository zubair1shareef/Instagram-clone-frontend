import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Signup=()=>{

    const[name,setName]=useState("");
    const [email, setEmail] = useState("")
    const [image,setImage]=useState("");
    const [url,setUrl]=useState(undefined);
    const [password, setPassword] = useState("");
    const history=new useHistory()
    const [loading,setLoading]=useState("Signup")



    useEffect(()=>{

        if(url){
            dataPost()
            
        }
    },[url])

    const dataPost=()=>{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if (!re.test(email)){
           return M.toast({html:"email is invalid",classes:"#e53935 red darken-1"})

        }
        
      else
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"

            },
            body:JSON.stringify(
                {
                    name,
                    email,
                    password,
                    pic:url
                }
            )
        }).then(res=>{
            
    

            res.json().then(data=>{
                setLoading("loaing")
                if(data.error){
                    M.toast({html:data.error,classes:"#e53935 red darken-1"})
                   console.log(data.error)
                  
                   setLoading("signup")
                }
                else{
                    M.toast({html:"account created sucessfully",classes:"#00b0ff light-blue accent-3"})
                    history.push('/login')

                }
               
            })
           
        }
        )
       
    }
    
    const pushData=()=>{
        if(image){
            imageupload()

        }
        else{
            dataPost()

        }
       

        
    }

     const imageupload=()=>{
        setLoading("loading")
        
        const data=new FormData();
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("clone_name","zubair1")
        fetch(" https://api.cloudinary.com/v1_1/zubair1/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
              return  M.toast({html:data.error,classes:"#e53935 red darken-1"})

            }
            
            setUrl(data.url)})
        

        
     }




    return(
        <div style={{ backgroundColor: '#fafafa'}}>
           <div className="card my-card input-field">
               <div className="brand-logo insta-size ">
                 <h1  style={{fontSize:"60px"}}>instagram</h1>  
                 
               </div>
               <input className="input-color" type="text" 
               placeholder="name"
               value={name} 
               onChange={(e)=>setName(e.target.value)} >
                   
               </input>
               
               <input  type="text" placeholder="email" className="input-color"
               value={email} 
               onChange={(e)=>setEmail(e.target.value)} >
                   
               </input>
               <input type="password" placeholder="password" className="input-color"
               value={password} 
               onChange={(e)=>setPassword(e.target.value)} >
                   
               </input>
               
               <br></br>
               <br></br>

               
               <button className="btn waves=effect #64b5f6 blue lighten-2 " style={{color:"white"}} onClick={pushData }>
               {loading}
               </button>
               <br></br>
              
           
           
               <h6>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</h6>
               <br></br>
               
              
               


           </div>
           <div className="card insta-size  my-card">
               <Link to="/login"> <h6 style={{color:"black"}} >have account<div style={{color:"blue"}}>signin</div></h6></Link>
               </div>
              
       </div>
    );

}
export default Signup