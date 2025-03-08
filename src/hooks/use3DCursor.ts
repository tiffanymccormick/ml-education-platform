import { useState, useEffect, RefObject } from 'react'

export const use3DCursor = (ref: RefObject<HTMLElement>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!ref.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const x = (e.clientX - rect.left) / element.offsetWidth
      const y = (e.clientY - rect.top) / element.offsetHeight
      
      setPosition({ x: x * 2 - 1, y: -(y * 2 - 1) })
    }

    const element = ref.current
    element.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
    }
  }, [ref])

  return position
} 