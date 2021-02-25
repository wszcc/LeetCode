import request, { Response } from ".";

export type SortType = "popular" | "earliest" | "latest"
export type SolutionList = {
  "userId": number,
  "userName": string,
  "avatar": string | null,
  "title": string,
  "summary": string,
  "view": string,
  "thumbup": number,
  "commentNum": number,
  "answerId": string,
  "createTime": string
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

export const fetchDetailSolution = (answerId: number) => request.get("/answer/answerId", {
  params: {
    answerId
  }
}) as Promise<Response<DetailInfo>>