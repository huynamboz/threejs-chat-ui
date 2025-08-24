import { useRef, useState, useEffect } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ControlledInput = (props: any) => {
  const { value, onChange, onKeyDown, ...rest } = props
  const [cursor, setCursor] = useState<number | null>(null)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = ref.current
    if (input) input.setSelectionRange(cursor, cursor)
  }, [ref, cursor, value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCursor(e.target.selectionStart)
    if (onChange) {
      onChange(e);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  return <input ref={ref} value={value} onChange={handleChange} onKeyDown={handleKeyDown} {...rest} />
}
