"use client"

import { useState, useCallback } from "react"

interface ErrorState {
  error: Error | null
  isError: boolean
}

interface ErrorHandlerResult extends ErrorState {
  setError: (error: Error | null) => void
  clearError: () => void
  handleError: (error: unknown) => void
}

export function useErrorHandler(): ErrorHandlerResult {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
  })

  const setError = useCallback((error: Error | null) => {
    setErrorState({
      error,
      isError: error !== null,
    })
  }, [])

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isError: false,
    })
  }, [])

  const handleError = useCallback((error: unknown) => {
    console.error("Error handled:", error)
    
    if (error instanceof Error) {
      setError(error)
    } else if (typeof error === "string") {
      setError(new Error(error))
    } else {
      setError(new Error("予期しないエラーが発生しました"))
    }
  }, [setError])

  return {
    ...errorState,
    setError,
    clearError,
    handleError,
  }
}

// 非同期処理用のエラーハンドリングフック
interface AsyncErrorHandlerResult extends ErrorHandlerResult {
  isLoading: boolean
  executeAsync: <T>(asyncFn: () => Promise<T>) => Promise<T | null>
}

export function useAsyncErrorHandler(): AsyncErrorHandlerResult {
  const errorHandler = useErrorHandler()
  const [isLoading, setIsLoading] = useState(false)

  const executeAsync = useCallback(async <T>(
    asyncFn: () => Promise<T>
  ): Promise<T | null> => {
    try {
      setIsLoading(true)
      errorHandler.clearError()
      const result = await asyncFn()
      return result
    } catch (error) {
      errorHandler.handleError(error)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [errorHandler])

  return {
    ...errorHandler,
    isLoading,
    executeAsync,
  }
}