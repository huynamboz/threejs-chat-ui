import { useRef, useState, useEffect } from 'react'

export const ControlledInput = (props) => {
  const { value, onChange, ...rest } = props
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
  return <input ref={ref} value={value} onChange={handleChange} {...rest} />
}
