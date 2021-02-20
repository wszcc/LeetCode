import request, { Response } from './index'

export interface Comment {
  "commentId": string,
  "content": string,
  "userId": string,
  "nickname": string,
  "avatar": string,
  "commentTime": string,
  "thumbup": 0 | 1,
  "replyNum": number | null,
  "islike": number
}

export const queryComments = (pageNum: number, parentId: string) => request.post("/comment/get", {
  pageNum, parentId
}) as Promise<Response<{
  "g": Comment[],
  "totalPage": number
}>>

export const getReply = (parentId: string) => request.post("/comment/reply", { parentId }) as Promise<Response<{
  "at": string,
  "content": string,
  "nickname": string,
  "avatar": string,
  "userId": string,
  "commentId": string,
  "commentTime": null | string,
  "thumbup": null | number,
  "islike": number,
}[]>>

export const sendComment = (parentId: string, userId: string, content: string) => request.post("/comment/add", { parentId, userId, content }) as Promise<Response<null>>

export const setLike = (targetId: string, islike: boolean, target = "comment") => request.post("/common/like", { targetId, target, islike })