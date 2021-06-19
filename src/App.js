import logo from './logo.svg';
import './App.css';


import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter,Route,Switch,useHistory,} from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import Stories from './components/screens/Stories'
import Model from './components/screens/Model'
import Createpost from './components/screens/Createpost'
import UsersProfile from './components/screens/Userprofile'
import FollowPost from './components/screens/FollowPost'
import Editprof from './components/screens/Editprof'
import Search from './components/screens/Search'
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
