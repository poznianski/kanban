import Image from 'next/image'

interface IButton {
  onClick?: () => void
  isAdd?: boolean
  label: string
}

const Button = ({ onClick, isAdd, label }: IButton) => {
  return (
    <button
      type="button"
      className="inline-flex h-[50px] w-[200px] items-center justify-center gap-2
       rounded bg-theme-main text-bg-secondary transition-all ease-in-out
       hover:bg-theme-secondary hover:text-text-main"
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
