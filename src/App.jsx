import { useState, useEffect, useRef } from 'react'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import PracticeAreas from './components/PracticeAreas'
import Heritage from './components/Heritage'
import Team from './components/Team'
import Footer from './components/Footer'

function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const mainRef = useRef(null)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 6 + 2
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => setLoading(false), 800)
      }
      setProgress(current)
    }, 250)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Preloader progress={progress} done={!loading && progress >= 100} />
      <div ref={mainRef} style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease' }}>
        <Header />
        <main>
          <Hero />
          <TrustBar />
          <PracticeAreas />
          <Heritage />
          <Team />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
