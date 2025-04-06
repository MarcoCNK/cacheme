import { Link } from 'react-router-dom'

const DefaultScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full text-white bg-trasparent' >
        <Link to={"/login"} >
            Just login, please
        </Link>
    </div>
  )
}

export default DefaultScreen