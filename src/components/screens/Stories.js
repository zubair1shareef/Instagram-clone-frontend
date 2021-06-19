import React,{useEffect,useState,useContext} from 'react'

import {Link,useHistory} from 'react-router-dom'

import M from 'materialize-css'


import {UserContext} from '../../App'
import Popup from 'reactjs-popup';


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
      color:"black",
      backgroundColor:'white',
     height:'30px'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }


function Stories(){
    const[stories,setStroy] =useState([])
    const {state,dispatch}=useContext(UserContext)
    const [image,setImage]=useState("")
    const [loading,setLoading]=useState("createpost")
    const [url,setUrl]=useState("")
    const history=new useHistory()

    
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

   

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
                
               
                fetch('/createstories',{
                    method:"post",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem('jwt')
                    },
                    body:JSON.stringify({
                        photo:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    
                    
                    console.log(result)
                })
                
    
            
            }).then(()=>{
                M.toast({html:"stories created",classes:"#00b0ff light-blue accent-3"})
                console.log(url)

            })
                .catch(err=>{
                    console.log(err)
                })
                
                

        }
        
    },[image])
    
    



    useEffect(()=>{
        fetch('/stories',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")   
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setStroy(result.stories)
            //setData(result.posts)
            
        
        })
    },[])

//popup start
const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };




//popup end





    return(
        <div>
            <div className="scrollmenu " style={{border: "1px solid #cccccc", display:"flex" ,marginTop:"2%" ,marginBottom:"0px"}} >
            <div className="file-field input-field">
                <div className=" " style={{color:"white",display:"flex"}}>
                <img style={{width:"90px",height:"90px",fontSize:'0',borderRadius:"45px",border: "1px solid linear-gradient(red, yellow)", borderSpacing:"0px" }}   src={state?state.pic:""}/>

                    <input type="file" multiple onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                
                </div>
            
            
            { stories?
                     stories.map(iteam=>{
                        return(
                             <div  style={{display:"flex"}}>

                                
                            <img onClick={handleClickOpen} style={{width:"90px",height:"90px",fontSize:'0',borderRadius:"45px",border: "1px solid linear-gradient(red, yellow)",marginBottom:"0px", borderSpacing:"0px" }} alt={iteam._id}  src={iteam.postedBy.pic}>
                                                                </img>

                                                            {progress>='100'?
                                                            <Dialog  fullScreen onClose={handleClose} TransitionComponent={Transition}>
                                                                { history.push('/followpost')}


                                                            </Dialog>:
                                                           
                                                             <Dialog   fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                                                             <AppBar className={classes.appBar}>
                                                             <LinearProgressWithLabel value={progress} />
                                                             <Toolbar>
                                                                 <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                                                 X
                                                                 
                                                                 </IconButton>
                                                                 
                                                                 
                                                             </Toolbar>
                                                             </AppBar>
                                                             <img style={{backgroundColor:"black"}} className='image'  style={{width:'90%',height:'90%'}}  src={iteam.photo}></img>
                                                         </Dialog>}


                                   
                            
                            
                            </div>
                         
     
                        )
                    })
                    :"loading"

                }

           
            
            

        

               
            </div>
        </div>
        )
}
export default Stories;