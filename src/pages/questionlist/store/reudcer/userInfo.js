export default function userInfo(userInfo={
   userInfo:[]
},action){
    switch(action.type){
        case "userInfo_loadover":
            return{
                userInfo:action.userInfo
            }
    
    default:
        return userInfo;
    }
}
