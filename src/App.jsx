import { useEffect, useState } from 'react'
import Programmation from './components/Programmation/Programmation'
import { useAudioStore } from './store/store'

function App() {

  const trackList = useAudioStore((state) => state.trackList);

  useEffect(() => {
    console.log(trackList);
  }, [trackList]);

  return (
    <>
      <h1>Rock en Seine</h1>
      <Programmation />
    </>
  )
}

export default App
