import { useEffect, useState } from 'react'
import Programmation from './components/Programmation/Programmation'
import { useAudioStore } from './store/store'
import AudioControler from './components/AudioControler/AudioControler';

function App() {

  const trackList = useAudioStore((state) => state.trackList);

  useEffect(() => {
    console.log(trackList);
  }, [trackList]);

  return (
    <>
      <h1>Rock en Seine</h1>
      <Programmation />
      <AudioControler />
    </>
  )
}

export default App
