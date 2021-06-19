import React,{useState,useContext,useEffect} from 'react'
import{Link,useHistory} from 'react-router-dom'
import { UserContext } from '../App';
import Popup from 'reactjs-popup';
import M from 'materialize-css'


function Navbar() {
   // const history=useHistory()
    const {state,dispatch} =useContext(UserContext)
    //
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("")
    const [loading,setLoading]=useState("createpost")
    const [url,setUrl]=useState("")
    const history=new useHistory()
    
//

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

//


    const Createpost=()=>{
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
    return [
      <div className="" > 
         <nav>
      <div className="nav-wrapper white">
        <Link to="/followpost" className="brand-logo " style={{marginLeft:"20%"}} >Instagram</Link>
        
        
        

        
        
        <ul id="nav-mobile" className="right hide-on-med-and-down" style={{marginRight:"2%"}}>
        
      
          
        
            
        
         {/*} <li><Link className="material-icons " to="/login">home</Link></li>*/}
          {/*<li><Link to="/signup">Signup</Link></li>*/}
         
          
          <li><Link to="/followpost"><i class="large material-icons">home</i></Link></li>
   
          <li><Link to="/"><i class="far fa-compass fa-1g"></i></Link></li>
          

          <Popup trigger={<li><i style={{color:"black"}} class="large material-icons">create_new_folder</i></li>} position="bottom  ">
             <div><Createpost></Createpost></div>
          </Popup>

          <li><Link to="/search"><i class="large material-icons">people</i></Link></li>
          
          
          
         

          <Popup style={{border:" 1px solid #000"}}
    trigger={<img style={{width:"30px",height:"30px",borderRadius:"15px"}}   src={state?state.pic:".."}/>}
    position="bottom center"
    nested
  >
    <div>
      <ul>
         <li style={{padding:"5px"}}><Link to="/profile"><i class="tiny material-icons">person</i>profile</Link></li>
        
        
        
        <li className="collection-item "> <button className="collection-item btn-flat waves=effect " style={{color:"black"}} onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                window.location.reload(); 
                
          }
            
          }>
                   LogOut
               </button></li>
      </ul>
      
    </div>
  </Popup>


        
        </ul>
      </div>
    </nav>
    </div>
    ];
  }
  
  export default Navbar;