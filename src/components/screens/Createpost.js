import React,{useState ,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Createpost=()=>{
    

    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("")
    const [loading,setLoading]=useState("createpost")
    const [url,setUrl]=useState("")
    const history=new useHistory()

    useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                  
    
                },
                body:JSON.stringify(
                    {
                        title,
                        body,
                        photo:url
                    }
                )
            }).then(res=>{
          
                res.json().then(data=>{
                    
                    if(data.error){
                        M.toast({html:data.error,classes:"#e53935 red darken-1"})
                       console.log(data.error)
                       setLoading("createpost")
                      
                      
                    }
                    else{
                        M.toast({html:"post created sucessfully",classes:"#00b0ff light-blue accent-3"})
                        console.log("post created")
                        history.push('/followpost')
    
                    }
                   
                })
               
            }
            )

        }
    },[url])

    const Postdata=()=>{
        
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
        <div className="card input-filed" style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}/>
            <div>
                        <div className="file-field input-field">
                <div className="btn waves=effect #64b5f6 blue dark-1" style={{color:"white"}}>
                    <span>img</span>
                    <input type="file" multiple onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
                </div>
                </div>
                <button className="btn waves=effect #64b5f6 blue dark-1 " style={{color:"white"}} onClick={Postdata }>
               {loading}
               </button>
            </div>


        </div>
    )
}

export default Createpost