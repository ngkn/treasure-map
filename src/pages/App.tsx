import { useState } from 'react'
import { GameProvider } from 'context/gameContext'

import { FormInstructions, Map } from 'components'

import 'styles/App.css'

const App = () => {
  const [displayMap, setDisplayMap] = useState(false)

  const handleMapCreation = (isInstructionsValid: boolean) => {
    if (isInstructionsValid) setDisplayMap(true)
  }

  return (
    <div className="App">
      <GameProvider>
        <div>treasure map</div>
        <div className="GameContainer">
          <div>
            <FormInstructions handleMapCreation={handleMapCreation} />
          </div>
          {displayMap && (
            <div>
              <Map />
            </div>
          )}
          <div />
        </div>
      </GameProvider>
    </div>
  )
}

export default App
