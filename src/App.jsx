import { useState } from 'react'
import viteLogo from './images/logo.svg'
import './App.css'
import tailwindConfig from '../tailwind.config'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col items-center justify-between h-screen">
        <div className="mt-10"> 
          <a href="#" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
        </div>
        <div className="my-auto text-center px-3"> 
          <h1 className='heading-md mb-2'>Welcome to <span className='text-product'>TypeWeather</span></h1>
          <p className='text-base-300'>Choose a location to see the weather forecast</p>
          <input className='bg-textbox-bg px-6 py-4 w-full mt-7 rounded-lg placeholder:text-base-400 text-white' name="myInput" placeholder='Search location'/>
        </div>
      </div>
    </>
  )
}

export default App
