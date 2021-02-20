import request, { Response } from './index'
import axios from 'axios'
export const queryComments = (pageNum: number, parentId: number) => request.post("/comment/get", {
  pageNum, parentId
}) as Promise<Response<{
  "g": {
    "commentId": number,
    "content": string,
    "userId": number,
    "nickname": string,
    "avatar": string,
    "commentTime": string,
    "thumbup": 0 | 1
  }[],
  "totalPage": number
}>>

export const getReply = (parentId: number) => request.post("/comment/reply", { parentId }) as Promise<Response<{
  "at": string,
  "content": string,
  "nickname": string,
  "avatar": string,
  "userId": number,
  "commentId": number,
  "commentTime": null | string,
  "thumbup": null | number,
  "islike": boolean,
}[]>>

export const sendComment = (parentId: number, userId: number, content: string) => request.post("/comment/add", { parentId, userId, content }) as Promise<Response<null>>

export const setLike = (targetId: number, islike: boolean, target = "comment") => request.post("/common/like", { targetId, target, islike })

export const getDescData = (questionId?:string) => axios.get('/question/start', {params:{questionId}}) as Promise<Response>

export const likeQuestion = (
  target:string, 
  islike:boolean, 
  targetid:string
  ) => axios.post('/common/like', {target, targetid, islike}) as Promise<Response>

export const getCommit = (questionId:string) => axios.post('/commit/all', {questionId}) as Promise<Response>
