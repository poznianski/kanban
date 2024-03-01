import clsx from 'clsx/lite'
import Image from 'next/image'

interface IButton {
  onClick?: () => void
  isAdd?: boolean
  label: string
  sm?: boolean
  inactive?: boolean
}

const Button = ({ onClick, isAdd, label, sm, inactive }: IButton) => {
  return (
    <button
      type="button"
      className={clsx(
        'inline-flex  items-center justify-center gap-2 rounded bg-theme-main text-bg-secondary transition-all ease-in-out hover:bg-theme-secondary hover:text-text-main',
        sm
          ? 'h-[35px] w-[100px] border-2 border-text-main'
          : 'h-[50px] w-[200px]',
        inactive && 'disabled',
      )}
      onClick={onClick}
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
