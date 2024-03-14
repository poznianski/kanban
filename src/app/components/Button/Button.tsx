import { clsx } from 'clsx/lite'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface IButton {
  onClick?: () => void
  isAdd?: boolean
  label: string
  sm?: boolean
  disabled?: boolean
}

const Button = ({ onClick, isAdd, label, sm, disabled }: IButton) => {
  return (
    <button
      type="button"
      className={twMerge(
        clsx(
          'hover inline-flex h-[50px] w-full items-center justify-center gap-2 rounded bg-theme-main p-2 text-bg-secondary ease-in-out hover:bg-theme-secondary hover:text-text-main',
          sm && 'h-[36px] border',
          disabled && 'disabled',
        ),
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {isAdd && (
        <Image
          src="add.svg"
          height="20"
          width="20"
          alt="add"
          className="mr-2"
        />
      )}
      {label}
    </button>
  )
}

export default Button
