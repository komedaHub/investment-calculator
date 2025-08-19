"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  decimals?: number
  allowNegative?: boolean
  formatDisplay?: boolean
  unit?: string
  unitPosition?: 'prefix' | 'suffix'
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ 
    className, 
    value, 
    onChange, 
    min, 
    max, 
    step = 1, 
    decimals = 0,
    allowNegative = false,
    formatDisplay = false,
    unit,
    unitPosition = 'suffix',
    ...props 
  }, ref) => {
    const [displayValue, setDisplayValue] = React.useState('')
    const [isFocused, setIsFocused] = React.useState(false)

    // 数値を表示用文字列に変換
    const formatNumber = (num: number): string => {
      if (isNaN(num)) return ''
      
      if (formatDisplay && !isFocused) {
        return new Intl.NumberFormat('ja-JP', {
          minimumFractionDigits: 0,
          maximumFractionDigits: decimals,
        }).format(num)
      }
      
      return decimals > 0 ? num.toFixed(decimals) : num.toString()
    }

    // 表示用文字列を数値に変換
    const parseNumber = (str: string): number => {
      // カンマと全角数字を除去・変換
      const cleanStr = str
        .replace(/,/g, '')
        .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
        .replace(/[^\d.-]/g, '')

      const num = parseFloat(cleanStr)
      if (isNaN(num)) return 0

      // 負数のチェック
      if (!allowNegative && num < 0) return 0

      // 最小値・最大値のチェック
      if (min !== undefined && num < min) return min
      if (max !== undefined && num > max) return max

      // 小数点以下の桁数制限
      if (decimals === 0) return Math.round(num)
      return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
    }

    // 値が変更されたときの表示更新
    React.useEffect(() => {
      if (value !== undefined) {
        setDisplayValue(formatNumber(value))
      }
    }, [value, formatDisplay, isFocused, decimals])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      setDisplayValue(inputValue)

      const numericValue = parseNumber(inputValue)
      onChange?.(numericValue)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      // フォーカス時は数値のみ表示（カンマなし）
      if (value !== undefined) {
        setDisplayValue(decimals > 0 ? value.toFixed(decimals) : value.toString())
      }
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      // ブラー時はフォーマット済みで表示
      if (value !== undefined) {
        setDisplayValue(formatNumber(value))
      }
      props.onBlur?.(e)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // 上下矢印キーでの値変更
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        const newValue = (value || 0) + step
        onChange?.(parseNumber(newValue.toString()))
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        const newValue = (value || 0) - step
        onChange?.(parseNumber(newValue.toString()))
      }
      
      props.onKeyDown?.(e)
    }

    const inputElement = (
      <Input
        type="text"
        className={cn(className)}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...props}
      />
    )

    // 単位付きの場合
    if (unit) {
      return (
        <div className="relative">
          {unitPosition === 'prefix' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
              {unit}
            </div>
          )}
          <Input
            type="text"
            className={cn(
              unitPosition === 'prefix' && 'pl-8',
              unitPosition === 'suffix' && 'pr-8',
              className
            )}
            ref={ref}
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            {...props}
          />
          {unitPosition === 'suffix' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
              {unit}
            </div>
          )}
        </div>
      )
    }

    return inputElement
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }