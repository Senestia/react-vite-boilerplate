import { useEffect, useRef } from "react"

interface UseIntersectionObserverOptions {
  onIntersect: () => void
  enabled?: boolean
  rootMargin?: string
  threshold?: number
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  rootMargin = "0px",
  threshold = 0,
}: UseIntersectionObserverOptions) {
  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!targetRef.current || !enabled) return

    const element = targetRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          onIntersect()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [onIntersect, enabled, rootMargin, threshold])

  return targetRef
}
