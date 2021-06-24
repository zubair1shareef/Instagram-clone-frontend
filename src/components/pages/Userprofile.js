import React,{useEffect,useState,useContext} from 'react'
import { useHistory } from 'react-router'
import {UserContext} from '../../App'
import Navbar from '../Navbar'
import {useParams} from 'react-router-dom'




const Userprofile =()=>{
    const [userProfile,setProfile]=useState(null)
    const {state,dispatch}=useContext(UserContext)
    const [showFollow,setShowFollow]=useState(true)
    const history = useHistory()
    const {userId} =useParams()
   
    useEffect(() => {
        fetch(`/user/${userId}`,{
            headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
            }

        }).then(res=>res.json())
        .then(resu=>{

            
            setProfile(resu)
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
        }).then(res=>{ history.go(0)})
       

    }

    const follow=()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userId
            })

        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)
        })
    }

    const unfollow=()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userId
            })

        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(data=>data)
                
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            
        })
    }


    const UserShow=()=>{
        return(
            <div style={{maxWidth:"650px",margin:"0px auto"}}>
        <div style={{display:'flex', justifyContent:"space-around",margin:"18px,0px", borderBottom:"1px solid gray" ,marginBottom:"10px"}}>
            <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
                src={userProfile.user.pic}
                />

            </div>
            <div>
                {console.log(userProfile)}
                <h4>{userProfile.user.name}</h4>
                <h5>{userProfile.user.email}</h5>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                <h6 >{userProfile.posts.length} post</h6>
                <h6>{userProfile.user.followers.length} followers</h6>
                <h6>{userProfile.user.following.length} following</h6>
                </div>
               
                {userProfile.user.followers.includes(state._id)? 
                <button className="btn waves=effect #64b5f6 blue lighten-2 " style={{color:"white"}} onClick={unfollow }>
                Unfollow
                </button>
                 :
               
               <button className="btn waves=effect #64b5f6 blue lighten-2 " style={{color:"white"}} onClick={follow }>
               follow
               </button>
               }
               
               
              
                
               

            </div>
        </div>
       <div className="gallery">
           {
               userProfile.posts.map(iteam=>{
                   return(
                       
                           <img key={iteam._id}  style={{maxHeight:"200px",margin:"10px"}}  className="iteam" src={iteam.photo} alt={iteam.title}/>
 

                   )
               })
           }
         
       </div>
     </div>

        )

    }

    return(
        <div ><Navbar></Navbar>
        <>
        {userProfile ?
        <UserShow/>
        
        
        :  <div>
            <img className="imageL" style={{height:"90px",width:"90px"}} src="https://cdn.icon-icons.com/icons2/2716/PNG/512/instagram_logo_icon_173070.png"></img>
            
            </div>}
       
        </>


        
        </div>
        
        
    );

}
export default Userprofile