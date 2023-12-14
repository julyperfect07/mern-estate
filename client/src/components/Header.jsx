import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toggleDarkMode } from '../redux/user/userSlice';


const Header = () => {
  const {currentUser, darkMode} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
  useEffect(() => { 
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])
  // console.log(currentUser)
  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode(!darkMode));
  };
  return (
    <header className=' bg-slate-200 shadow-md '>
      <div className=' flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h3 className=' font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className=' text-slate-500'>Prime</span>
            <span className=' text-slate-700'>Estate</span>
          </h3>
        </Link>
        <form onSubmit={handleSubmit} className=' bg-slate-100 p-3 rounded-lg flex items-center' >
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='Search...' className=' bg-transparent focus:outline-none w-24 sm:w-64' />
          <button className=' text-slate-600'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </form>
        <ul className=' flex gap-4'>
          <Link to='/'>
            <li className=' hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
          </Link>
          <Link to='/about'>
            <li className=' hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li>
          </Link>

          <Link to='/profile'>
            {currentUser ? (
              <img className=' rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile"   />
            ) : (
              <li className=' text-slate-700 hover:underline cursor-pointer'>Sign in</li>
            )}
          </Link>
        </ul> 
      </div>
    </header>
  )
}

export default Header