const Per_Height = 22 //每一行高度

export const calcLine = (dom: HTMLTextAreaElement): number => {
  return Math.floor(dom.scrollHeight / Per_Height)
}