import { useCallback, useEffect, useRef } from "react"

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  onIntersect: () => void
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "100px",
  onIntersect,
}: UseIntersectionObserverOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  const setupObserver = useCallback(() => {
    const sentinelElement = sentinelRef.current
    if (!sentinelElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) {
          onIntersect()
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(sentinelElement)

    return () => {
      observer.unobserve(sentinelElement)
    }
  }, [onIntersect, threshold, rootMargin])

  useEffect(() => {
    return setupObserver()
  }, [setupObserver])

  return { sentinelRef }
}
