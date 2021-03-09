import IndexEasy from '../indexEasy'

const difficulty = [
    {
        name:'简单',
        to:'/quesionlist/?difficulty=easy',

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

const lists=[
    {
        name:'LeetCode热题HOT 100',
    },{
        name:'LeetCode精选数牛i...',
    },{
        name:'LeetCode精选算法200题',
    },{
        name:'力扣杯–竞赛合集',
    },{
        name:'腾讯精选练习50题',
    }
]

const tags = [
    {
        name:'栈',
    },{
        name:'堆',
    },{
        name:'贪心算法',
    },{
        name:'排序',
    },{
        name:'位运算',
    },{
        name:'树',
    }
]

export{difficulty,status,tags,lists};