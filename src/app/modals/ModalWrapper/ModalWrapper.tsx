import { useRef } from 'react'

import useClickOutside from '@/app/hooks/useClickOutside'
import { IModalWrapper } from '@/types/types'

const ModalWrapper = ({ children, onClose }: IModalWrapper) => {
  const modalRef = useRef(null)
  useClickOutside(modalRef, onClose)

  return (
    <>
      <div className="modal-backdrop" />

      <div
        ref={modalRef}
        className="modal relative"
      >
        <span
          className="absolute right-3 top-3 cursor-pointer text-xl hover:scale-125"
          onClick={onClose}
        >
          ✘
        </span>
        {children}
      </div>
    </>
  )
}

export default ModalWrapper
