import React,{useEffect,useState,useContext} from 'react'
import { useHistory } from 'react-router'
import {UserContext} from '../../App'
import Popup from 'reactjs-popup';

import Navbar from '../Navbar'
import M from 'materialize-css'
import { Link } from 'react-router-dom';





const Profile =()=>{
    const [mypics,setPics]=useState([])
    
    const [image,setImage]=useState('')
    const [name,setName]=useState('')
   

    const history = useHistory();
    const {state,dispatch}=useContext(UserContext)

    useEffect(()=>{
        if(state){
            setImage(state.pic)
            setName(state.name)

        }
       
    
    },[state])

    useEffect(() => {
        fetch('/mypost',{
            headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
            }

        }).then(res=>res.json())
        .then(result=>{
          setPics(result.mypost)
        })
    },[])

   

    const deletePost=(postid)=>{
        fetch(`deletepost/${postid}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
            
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData=mypics.filter(iteams=>{
                return iteams._id!==result._id
            })
            setPics(newData)
            window.location.reload()
         
        })
       
       

    }
  
    
    

    return(
        <div ><Navbar></Navbar>
        {console.log(state)}
        
        <div style={{maxWidth:"750px",margin:"9px auto"}}>
        <div style={{display:'flex', justifyContent:"space-around",margin:"18px,0px", borderBottom:"1px solid gray" ,marginBottom:"10px"}}>
            <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px",marginRight:"10px",marginBottom:"20px"}} 
                src={state?image:".."}
                />

            </div>
            
            <div>
                <div style={{display:"flex",padding:"20px"}}>
                       
                        <h1 class="profile-user-name">{state?name:"loading"} </h1>

                        
                        

                </div>
                
                
               
               
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                <h6 ><b>{mypics?mypics.length:"0"}</b> post</h6>
                
                <h6><b>{state?state.followers.length:"0"}</b> followers</h6>
                <h6> <b>{state?state.following.length:"0"}</b>following</h6>
                
                
                
                </div>
                <h6> <b>{state?state.bio:""}</b></h6>
                <a >{state?state.email:""}</a>
                <div className="file-field input-field" style={{}}>
                    
                    <div className="  #ffffff " style={{color:"black",padding:"20px"}}>
                    <Link to='edituser'> <i class="material-icons">settings</i></Link>
                   
                        
                    </div>
                    
                    </div>
              
                
               

            </div>
            
        </div>
       <div className="gallery" style={{marginTop:"20px"}}>
           {
               mypics.map(iteam=>{
                   return(
                    <Popup style={{backgroundColor:"black"}} trigger={ <img key={iteam._id} style={{maxHeight:"200px",margin:"10px"}}  className="iteam" src={iteam.photo} alt={iteam.title}/>} position="top bottom center left">
                   
                    <div class="card">
                    <div className="card-image">
                    <img style={{maxWidth:"600px",maxHeight:"500px"}} src={iteam.photo}/>
                    <span className="card-title">{iteam.title}</span>
                    </div>
                    <div class="card-content">
                    <i className="material-icons" onClick={()=>deletePost(iteam._id)}>delete</i>

                    <h6>{iteam.likes.length} likes</h6>
                    
                    
                   
                    <p>{iteam.body}</p>
                    </div>
                </div>
                
  
 
                  </Popup>
                       
                           
                        
                           
                    
                    


                   )
               })
           }
         
       </div>


        </div>
       
            <footer style={{marginLeft:"35%"}}>
            <ul style={{display:'inline' }}>
            <li style={{display:'inline',marginLeft:'10px'}}>About </li>
            
            <li style={{display:'inline',marginLeft:'10px',marginLeft:'10px'}}>Top Accounts </li>
            <li style={{display:'inline',marginLeft:'10px'}}>Hashtags   </li>
            <li style={{display:'inline',marginLeft:'10px'}}>Locations </li>
            </ul>  
            <p><a href="zubair1shareef@gmail.com">zubair1shareef@gmail.com</a></p>
            </footer> 


        
        </div>
        
    );

}
export default Profile