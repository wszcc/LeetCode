import Login from '../pages/login/Login'
import Profile from '../pages/profile/Profile'
import QuestionList from '../pages/questionlist/QuestionList'
import QuestionIndex from '../pages/questionindex/QuestionIndex'
import ResetPassword from '../pages/resetpassword/ResetPassword'


const routerView =[
  {
    path: "/home",
    component: Login,
  },
  {
    path: "/topic/detail/:id",
    component: Profile,
  },
  {
    path: "/profile",
    component: QuestionList,
  },
  {
    path: "/theme",
    component: QuestionIndex,
  },
  {
    path: "/mycollect",
    component: ResetPassword,
  },
];


export default routerView
