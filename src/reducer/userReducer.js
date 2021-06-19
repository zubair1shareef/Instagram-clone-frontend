export const initialState=null

export const reducer =(state,action)=>{
    if(action.type==='USER'){
        return action.payload
    }
    if(action.type==='CLEAR'){
        return null
    }
    if(action.type==="UPDATE"){
        return{
            ...state,
            followers:action.payload.followers,
            following:action.payload.following
        }
    }
    if(action.type==="UPDATEPIC"){
        return{
            ...state,
            pic:action.payload
        }
    }
    if(action.type==="UPDATEUSER"){
        return{
            ...state,
            bio:action.bio,
            name:action.name
        }
    }
    return state
}