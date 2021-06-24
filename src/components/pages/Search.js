import React, { Component,useState} from 'react'
import Navbar from '../Navbar'
import {Link} from 'react-router-dom'

const Search=()=>{
    const [search,setSearch]=useState('')
    const [searchdata,setSearchData]=useState([])

    const searching=(query)=>{
        setSearch(query)
        fetch('/search-user',{
            method:"post",

            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                query
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setSearchData(result.user)
        })

    }

    return(
        <div>
            <Navbar></Navbar>
            <div className="container">
           
  <input type="text" placeholder="Search.." value={search} onChange={(e)=>searching(e.target.value)}/>
  <ul className="collection">
      {searchdata.map(iteam=>{
          return(
            <Link style={{margin:"10px"}} className="collection-item" to={'/profile/'+iteam._id} > <li  >
                <div>
                <img style={{width:"40px",height:"40px",borderRadius:"20px"}}   src={iteam?iteam.pic:".."}/>{iteam.name}
                </div>
                {iteam.email}
                
                
                </li></Link>
          )
          
      })}
      
      
      
  </ul>


            </div>
           


        </div>
        )
}

export default Search