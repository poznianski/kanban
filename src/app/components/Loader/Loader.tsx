import { InfinitySpin } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className="flex justify-center">
      <InfinitySpin
        width="200"
        color="#00796b"
      />
    </div>
  )
}

export default Loader
