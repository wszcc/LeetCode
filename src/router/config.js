import Login from '../pages/login/Login'
import Profile from '../pages/profile/Profile'
import QuestionList from '../pages/questionlist/QuestionList'
import QuestionIndex from '../pages/questionindex/QuestionIndex'
import ResetPassword from '../pages/resetpassword/ResetPassword'


const routerView =[
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/question/:id",
    component: Profile,
  },
  {
    path: "/quesionlist",
    component: QuestionList,
  },
  {
    path: "/questionindex",
    component: QuestionIndex,
  },
  {
    path: "/resetpassword",
    component: ResetPassword,
  },
];


export default routerView
