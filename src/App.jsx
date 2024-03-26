import { useState } from 'react'
import viteLogo from './images/logo.svg'
import './App.css'
import tailwindConfig from '../tailwind.config'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1 className='heading-md'>Welcome to <span className='text-product'>TypeWeather</span></h1>
      
    </>
  )
}

export default App
