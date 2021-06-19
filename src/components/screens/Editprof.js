import React,{useEffect,useState,useContext,Component} from 'react'
import {UserContext} from '../../App'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Editprof=()=>{
    const {state,dispatch}=useContext(UserContext)
    
    const[name,setName]=useState("");
    const[bio,setbio]=useState("");
    const[password,setPassword]=useState("");
    const [url,setUrl]=useState(undefined);
    const [image,setImage]=useState("");
    const history=new useHistory()
    
    useEffect(()=>{
      if(state) { 
          setName(state.name)
          setbio(state.bio)
        }

    },[state])


    const edit=()=>{
        fetch("/edituser",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")

            },
            body:JSON.stringify(
                {
                    name,
                    bio,
                    password
                }
            )
        }).then(res=>{
          
            res.json().then(data=>{
                
                if(data.error){
                    M.toast({html:data.error,classes:"#e53935 red darken-1"})
                   console.log(data.error)
                 
                  
                  
                }
                else{
                    M.toast({html:"post created sucessfully",classes:"#00b0ff light-blue accent-3"})
                    console.log("post created")
                    localStorage.setItem("user",JSON.stringify({...state,bio:data.bio,name:data.name}))
                    dispatch({type:"UPDATEUSER",payload:data.url})
                    history.push('/profile')
                   
                    console.log(data)
                   

                }
               
            })
           
        }
        )
    }

    useEffect(()=>{
        if(image){
            console.log(image)
            
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
                
                setUrl(data.url)
                
               
                fetch('/updatepic',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem('jwt')
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    
                    localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
                    dispatch({type:"UPDATEPIC",payload:data.url})
                    console.log(result)
                })
                
    
            
            }).then(()=>{
                console.log(url)

            })
                .catch(err=>{
                    console.log(err)
                })
                
                

        }
        
    },[image])


    

    return(
        <div className="container">
            <img src={state?state.pic:""}></img>
                    <div className="  #ffffff " style={{color:"black",padding:"20px"}}>
                        
                        <input type="file" multiple onChange={(e)=>setImage(e.target.files[0])}/>
                       
                    </div>
                
                    

                    <div className="form-group">
                    <label className="text-muted">name</label>
                    <input onChange={(e)=>setName(e.target.value)} value={state?name:""}
                     
                    type="text" className="form-control"></input>

                    </div>

                    <div className="form-group">
                    <label className="text-muted">email</label>
                    <input value={state?state.email:"loading"} disabled
                    onChange={''} type="email" className="form-control"></input>

                    </div>
                    <div className="form-group">
                    <label className="text-muted">bio</label>
                    <input value={bio}
                    onChange={(e)=>setbio(e.target.value)} type="text" className="form-control"></input>

                    </div>

                    <div className="form-group">
                    <label className="text-muted">password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)}
                     type="password" className="form-control"></input>

                    </div>
                   
                    
                    
                    <button className="btn waves=effect #64b5f6 blue dark-1 " style={{color:"white"}} onClick={edit }>
               submmit
               </button>
                    


                

        </div>
        
        )
}
export default Editprof