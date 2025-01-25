import React from 'react'
import Navbar from './sections/navbar.jsx'
import Hero from './sections/hero.jsx'
import About from './sections/About.jsx'
import Projects from './sections/Projects.jsx'
import Clients from './components/Clients.jsx'

const App = () => {
  return(
    <main className='max-w-7xl mx-auto'>
      <Navbar/>
      <Hero/>
      <About/>
      <Projects/>
      <Clients/>
    </main>
  )
}

export default App
