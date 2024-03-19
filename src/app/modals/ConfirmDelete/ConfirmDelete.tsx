import Button from '@/app/components/Button/Button'
import ModalWrapper from '@/app/modals/ModalWrapper/ModalWrapper'
import { IConfirmDelete } from '@/types/types'

const ConfirmDelete = ({ onClose, onConfirm }: IConfirmDelete) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="p-4">
        <p className="mb-5 text-center text-2xl">Are you sure?</p>

        <Button
          label="Yes"
          onClick={onConfirm}
        />
      </div>
    </ModalWrapper>
  )
}

export default ConfirmDelete
