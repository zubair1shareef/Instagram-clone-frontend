import React,{useState,useEffect,useContext} from 'react'
import Navbar from '../Navbar'
import {Link} from 'react-router-dom'
import Stories from './Stories'
import {UserContext} from '../../App'


const FollowPost=()=>{
    const[data,setData] =useState([])
    const[user,setUser] =useState([])
    
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/followpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")   
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        
        })
    },[])
    useEffect(()=>{
        fetch('alluser',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")   
            }
        }).then(res=>res.json())
        .then(result=>{
            
            setUser(result)
          
        
        })
       
    },[])

   



    


    const likepost=(id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")   
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
           const newData=data.map(item=>{
               if(item._id===result._id){
                   return result 
               }
               else{
                   return item;
               }
           })
           setData(newData)
        })
    }
    const unlikepost=(id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")   
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData=data.map(item=>{
                if(item._id===result._id){
                    return result 
                }
                else{
                    return item;
                }
            })
            setData(newData)
        })
    }

    const comment=(text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })

        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData=data.map(item=>{
                if(item._id===result._id){
                    return result 
                }
                else{
                    return item;
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="flex"><Navbar></Navbar>
        
        <div className="row">
        <Stories/>
       
            {console.log(localStorage.getItem("jwt"))}
  <div className="column left" style={{ }} >
      <div>
          {  data.length>0?
          
              data.map(item=>{
                  return(
                    <div className="card home-card" key={item._id} style={{ padding:"10px"}}>
                        <div style={{display:"flex" , padding:"10px"}}>
                        <img style={{width:"35px",height:"35px",borderRadius:"17px",padding:"5px"}} 
                src={item.postedBy.pic}
                />

                        <h5><Link to={item.postedBy._id!==state._id? "/profile/"+item.postedBy._id : "/profile"}>{item.postedBy.name}</Link></h5>
                        </div>
                    
                    <div className="card-image">
                        <img  src={item.photo} />

      
                    </div>
                    
                    <div className="card-content">

                        {
                            item.likes.includes(state._id)
                       
                            ?   <i className=" material-icons" style={{color:"red",cursor:"pointer"}} onClick={()=>{unlikepost(item._id)}}>favorite</i>
                            : <i className="material-icons" style={{color:"red",cursor:"pointer"}} onClick={()=>{likepost(item._id)}}>favorite_border</i>
                        }
                         
                      
                    
                      <h6>{item.likes.length} likes</h6>
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>
                    {
                        item.comments.map(records=>{
                            return(
                                <h6 key={records}><span style={{fontWeight:"500",fontFamily:"serif"}}>{records.postedBy.name}</span>{records.text}</h6>
                            )
                        })
                    }
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        comment(e.target[0].value, item._id)
                    }}>
                    <input type="text" placeholder="add a comment "/>

                    </form>
                    
      
                    </div>
                   
                </div>
                  )
              })
              :

              <div className="card home-card"  style={{ padding:"10px"}}>
                        <div style={{display:"flex" , padding:"10px"}}>
                        <img style={{width:"35px",height:"35px",borderRadius:"17px",padding:"5px"}} 
                src="data:image/jpeg;base64,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"
                />

                        <h5>INSTAGRAM</h5>
                        </div>
                    
                    <div className="card-image">
                        <img  src="data:image/jpeg;base64,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" />

      
                    </div>
                    
                    <div className="card-content">

                         <i className="material-icons" style={{color:"red",cursor:"pointer"}} >favorite_border</i>
                       
                         
                      
                    
                      <h6>100 likes</h6>
                    <h6>welcome to instagram</h6>
                    <p>welcom to instagram ,enjoy unlimted fun</p>
                    
                        
                                <h6><span style={{fontWeight:"500",fontFamily:"serif"}}></span></h6>
                        
                    
                    
                    <input type="text" placeholder="add a comment "/>

                    
                    
      
                    </div>
                   
                </div>
          }
          
      </div>
     

    
  </div>


  
  <div className="column right" style={{maxWidth:"200px" ,marginTop:"90px"}}>
    <div>
    <div style={{ display:"flex"}}>
            <img style={{width:"60px",height:"60px",borderRadius:"30px"}}   src={state?state.pic:".."}/>
           

            {state? <h6>{state.name}</h6> :"laoding"}
            

        </div>
        <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
          <p>suggestion for you</p>
       </div>


       <div >

           {user.user?
           user.user.slice(0,5).map(res=>{
          
            return(
               
             
             <div style={{display:"flex" ,justifyContent:"space-around" ,marginTop:"5px"}}>
             <img style={{width:"60px",height:"60px",borderRadius:"30px"}}   src={res.pic}/>
             <h5><Link to={res._id!==state._id? "/profile/"+res._id : "/profile"}>{res.name}</Link></h5>
            
             
             <Link to="/signup"><div style={{color:"blue"}}>follow</div> </Link>
             </div>
            )
            
        })
           
           
           
           :"loaidng" }

       
       
        
       </div>
       <p>© 2021 Instagram from Facebook</p>
       


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
 
  
</div>


       
            

      

        </div>
    );

}
export default FollowPost