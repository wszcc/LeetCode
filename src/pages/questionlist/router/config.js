
const difficulty = [
    {
        name:'简单',
        to:'/quesionlist/?difficulty=easy'
    },{
        name:'普通',
        to:'/quesionlist/?difficulty=normal'
    },{
        name:'困难',
        to:'/quesionlist/?difficulty=hard'
    }
]


const status = [
    {
        name:'未做',
        to:'/quesionlist/?status=notdone'
    },{
        name:'已完成',
        to:'/quesionlist/?status=done'
    },{
        name:'尝试过',
        to:'/quesionlist/?status=tried'
    }
]


export{difficulty,status};