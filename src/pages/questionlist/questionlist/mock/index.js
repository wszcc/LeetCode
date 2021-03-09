import Mock from 'mockjs'

const Random = Mock.Random
const userInfo = {
    'data': {
                'solved':Random.integer(0,1000),
                'easy':Random.integer(0,100),
                'mid':Random.integer(0,100),
                'diff':Random.integer(0,100),
            }
}

Mock.mock("question/user/info","get",function(){
    return Mock.mock({
        "code":1,
        "data":userInfo,
        "message":"请求成功"
    })
})