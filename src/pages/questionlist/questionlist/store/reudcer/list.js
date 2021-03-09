
export default function list(list={
    loading:true,
    data:[]
},action){
    switch(action.type){
        case "list_loadover":
            return{
                records:action.records,
                data:action.data
            }
    
    default:
        return list;
    }
}
