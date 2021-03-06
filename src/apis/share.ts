import request, { Response } from '.'

export const dispatchLike = (
  target: "answer" | "comment" | "question",
  islike: number,
  targetId: string
) => request.post("/common/like", {
  target, islike: !!islike, targetId
}) as Promise<Response>