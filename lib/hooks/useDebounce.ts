import { useCallback, useRef } from 'react'

interface DebouncedFunction<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): void
    cancel: () => void
    flush: () => void
}

export function useDebounce<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): DebouncedFunction<T> {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const callbackRef = useRef(callback)
    const argsRef = useRef<Parameters<T> | null>(null)

    // Update callback ref when it changes
    callbackRef.current = callback

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }, [])

    const flush = useCallback(() => {
        if (argsRef.current) {
            callbackRef.current(...argsRef.current)
            cancel()
            argsRef.current = null
        }
    }, [cancel])

    const debouncedFunction = useCallback(
        (...args: Parameters<T>) => {
            argsRef.current = args
            cancel()

            timeoutRef.current = setTimeout(() => {
                callbackRef.current(...args)
                argsRef.current = null
            }, delay)
        },
        [delay, cancel]
    ) as DebouncedFunction<T>

    debouncedFunction.cancel = cancel
    debouncedFunction.flush = flush

    return debouncedFunction
}
