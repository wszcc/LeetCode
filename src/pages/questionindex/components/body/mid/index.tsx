import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

interface Props {
  setWidth: Dispatch<SetStateAction<number>>
}

const MidDragBar: FC<Props> = ({ setWidth }) => {
  const mid = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const $mid = mid.current!;
    const mouseDown$ = fromEvent($mid, "mousedown")
    const mouseMove$ = fromEvent(document, "mousemove")
    const mouseUp$ = fromEvent(document, "mouseup")

    const sup = mouseDown$.pipe(
      map(e => {
        const { offsetX } = e as MouseEvent
        return offsetX
      }),
      switchMap((offsetX) => mouseMove$.pipe(
        map((e) => {
          return (e as MouseEvent).clientX - offsetX
        }),
        takeUntil(mouseUp$)
      )),
    ).subscribe(val => {
      setWidth(val)
    })

    return () => {
      sup.unsubscribe()
    }
  }, [setWidth])

  return (
    <div ref={mid} className="mid-drag-bar"></div>
  )
}
export default MidDragBar