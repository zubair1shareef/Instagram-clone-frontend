import React,{useState,useEffect,useContext} from 'react'
import Navbar from '../Navbar'
import {Link} from 'react-router-dom'
import Stories from './Stories'
import {UserContext} from '../../App'


const Home=()=>{
    const[data,setData] =useState([])
    const[user,setUser] =useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('allpost',{
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
        <div  className=""><Navbar></Navbar>
        {data?
      <div className="conatiner" style={{display:'flex', justifyContent:"space-around",margin:"18px,0px" ,flexWrap:"wrap" }} >

        


      {  
            data.map(item=>{
                return(
                  <div className="" key={item._id} style={{ padding:"10px",margin:"9px",backgroundColor: '#ffff'}}>
                      <div style={{display:"flex" , padding:"10px"}}>
                      <img style={{width:"35px",height:"35px",borderRadius:"17px",padding:"5px"}} 
              src={item.postedBy.pic}
              />

                      <h5><Link to={item.postedBy._id!==state._id? "/profile/"+item.postedBy._id : "/profile"}>{item.postedBy.name}</Link></h5>
                      </div>
                  
                  <div className="" style={{maxWidth:"600px"}}>
                      <img style={{maxHeight:"500px"}} src={item.photo} />

    
                  </div>
                  {console.log(state)}
                  
                  <div className="">

                      
                    
                  
                  
                 
                  
                  
                  
    
                  </div>
              </div>
                )
            })
        }
      </div>
        
        
             :  <div>
         <img className="imageL" style={{height:"90px",width:"90px"}} src="https://cdn.icon-icons.com/icons2/2716/PNG/512/instagram_logo_icon_173070.png"></img>
         
         </div>}
       
        
        

        </div>
    );

}
export default Home