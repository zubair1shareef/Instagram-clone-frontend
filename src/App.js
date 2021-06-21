import logo from './logo.svg';
import './App.css';


import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter,Route,Switch,useHistory,} from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Signup from './components/pages/Signup'
import Stories from './components/pages/Stories'
import Model from './components/pages/Model'
import Createpost from './components/pages/Createpost'
import UsersProfile from './components/pages/Userprofile'
import FollowPost from './components/pages/FollowPost'
import Editprof from './components/pages/Editprof'
import Search from './components/pages/Search'
import {reducer,initialState} from './reducer/userReducer'

import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module



export const UserContext=createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{

    const user=JSON.parse(localStorage.getItem('user'))
    if(user){

      dispatch({type:"USER",payload:user}) 
      
    }
    else{
      history.push('/login')

    }
  },[])

  return(
    

    <Switch>
      
     
      <Route path='/login'
      
      ><Login/>
      </Route>
      <Route exact path='/profile'
      
      ><Profile/></Route>
      <Route path='/signup'
      
      ><Signup/>
      </Route>
      <Route path='/createpost'
      
      ><Createpost/>
      </Route>
      <Route path='/profile/:userId'
      
      ><UsersProfile/>
      </Route>
      <Route path='/followpost'
      
      ><FollowPost/>
      </Route>
      <Route path='/stories'
      
      ><Stories/>
      </Route>
      <Route exact path='/'
            ><Home/></Route>

<Route path='/search'
      
      ><Search/>
      </Route>
<Route path='/model'
      
      ><Model/>
      </Route>
<Route path='/edituser'
      
      ><Editprof/>
      </Route>




  </Switch>

  )
  

}

function App() {

  const [state,dispatch]=useReducer(reducer,initialState)
  return (
  
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter >
    <Routing/>
    
     
    
    </BrowserRouter>

    </UserContext.Provider>
    
    
    
   
  );
}

export default App;
