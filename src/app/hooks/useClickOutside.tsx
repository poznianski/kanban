import { RefObject, useEffect } from 'react'

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onClose: () => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).classList.contains('dropdown-item')
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClose])
}

export default useClickOutside
