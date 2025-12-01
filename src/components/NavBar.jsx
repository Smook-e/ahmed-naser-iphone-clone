
import {appleImg, bagImg, searchImg} from '../utils'
const NavBar = () => {
  return (
    <header className='w-full py-5 sm:px-10 px-5 flex-center'>
      <nav className='flex w-full screen-max-width'>
        <img src={appleImg} alt="Apple Logo" width={14} height={18} />

        <ul className='flex flex-1 justify-center max-sm:hidden'>
            {['Mac','iPad','iPhone','Watch','AirPods'].map((nav,i)=> (
                <li className=' px-3 cursor-pointer text-gray hover:text-white transition-all' key={nav}>{nav}</li>
            ))}
        </ul>
        <div className='flex gap-7 max-sm:justify-end max-sm:flex-1 '>
            <img src={searchImg} alt="Search" width={14} height={14} />
            <img src={bagImg} alt="Bag" width={14} height={14} />
        </div>
      </nav>
    </header>
  )
}

export default NavBar
