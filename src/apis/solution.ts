import request, { Response } from ".";

export type SortType = "popular" | "earliest" | "latest"
export type SolutionList = {
  "userId": number,
  "userName": string,
  "avatar": string | null,
  "title": string,
  "summary": string,
  "view": string,
  "islike": number,
  "thumbup": number,
  "commentNum": number,
  "answerId": string,
  "createTime": string,
}
export type DetailInfo = {
  "userId": number,
  "userName": string,
  "title": string,
  "content": string,
  "image": string,
  "view": string,
  "thumbup": string,
  "comment": {},
  "answerId": string,
  "createTime": string,
  "updateTime": string
}

export const fetchSolution = (questionId: number, currentPage: number) => request.post("/answerList/questionId", {
  questionId,
  currentPage
}) as Promise<Response<SolutionList[]>>

export const likeSolution = (solutionId: number, islike: boolean) => request.post("/common/like", {
  target:"question",
  islike,
  targetId: solutionId
}) as Promise<Response> 

export const fetchDetailSolution = (answerId: number) => request.get("/answer/answerId", {
  params: {
    answerId
  }
}) as Promise<Response<DetailInfo>>