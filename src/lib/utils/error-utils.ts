// エラータイプの定義
export enum ErrorType {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  CALCULATION_ERROR = "CALCULATION_ERROR", 
  NETWORK_ERROR = "NETWORK_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

// カスタムエラークラス
export class CalculationError extends Error {
  public readonly type: ErrorType
  public readonly field?: string

  constructor(message: string, type: ErrorType = ErrorType.CALCULATION_ERROR, field?: string) {
    super(message)
    this.name = "CalculationError"
    this.type = type
    this.field = field
  }
}

// バリデーションエラークラス
export class ValidationError extends CalculationError {
  constructor(message: string, field?: string) {
    super(message, ErrorType.VALIDATION_ERROR, field)
    this.name = "ValidationError"
  }
}

// エラーメッセージの日本語化
export function getErrorMessage(error: unknown): string {
  if (error instanceof ValidationError) {
    return error.message
  }
  
  if (error instanceof CalculationError) {
    switch (error.type) {
      case ErrorType.CALCULATION_ERROR:
        return `計算エラー: ${error.message}`
      case ErrorType.NETWORK_ERROR:
        return "ネットワークエラーが発生しました。しばらく待ってから再試行してください。"
      default:
        return error.message
    }
  }

  if (error instanceof Error) {
    // 一般的なエラーメッセージの日本語化
    if (error.message.includes("Network Error") || error.message.includes("fetch")) {
      return "ネットワークエラーが発生しました。接続を確認してください。"
    }
    
    if (error.message.includes("timeout")) {
      return "処理がタイムアウトしました。しばらく待ってから再試行してください。"
    }

    return error.message || "予期しないエラーが発生しました"
  }

  if (typeof error === "string") {
    return error
  }

  return "予期しないエラーが発生しました"
}

// 入力値の基本バリデーション
export function validateNumericInput(
  value: number, 
  fieldName: string, 
  min?: number, 
  max?: number
): void {
  if (isNaN(value) || !isFinite(value)) {
    throw new ValidationError(`${fieldName}は有効な数値を入力してください`, fieldName)
  }

  if (min !== undefined && value < min) {
    throw new ValidationError(`${fieldName}は${min.toLocaleString()}以上で入力してください`, fieldName)
  }

  if (max !== undefined && value > max) {
    throw new ValidationError(`${fieldName}は${max.toLocaleString()}以下で入力してください`, fieldName)
  }
}

// 安全な数値計算
export function safeCalculate<T>(
  calculation: () => T,
  errorMessage: string = "計算中にエラーが発生しました"
): T {
  try {
    const result = calculation()
    
    // 結果が数値の場合、無限大やNaNをチェック
    if (typeof result === "number") {
      if (!isFinite(result)) {
        throw new CalculationError("計算結果が無限大または無効な値になりました")
      }
    }
    
    return result
  } catch (error) {
    if (error instanceof CalculationError || error instanceof ValidationError) {
      throw error
    }
    
    throw new CalculationError(errorMessage)
  }
}

// エラーログ出力（開発環境のみ）
export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === "development") {
    console.error(`[${context || "Error"}]:`, error)
  }
}