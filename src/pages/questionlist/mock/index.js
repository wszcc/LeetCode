import Mock from 'mockjs'
import data from '../store'

const Random = Mock.Random
const dataList = []
for(let i = 10;i<100;i++){
    const template ={
        "code":1,
        "title":Random.string(12,30),
        "questionId":Random.string(11),
        "answer_num":Random.integer(200,1000),
        "difficulty":"简单",
        "passrate":Random.integer(0,100)+'%',
        "status":"未完成"
    }
    dataList.push(template)
}

Mock.mock('/question/list','get',function() {
    return Mock.mock({
            "code": 1,
            "data": dataList,
            "message": "请求成功！"
          })
})


