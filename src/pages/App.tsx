import { useState } from 'react'
import { GameProvider, useGame } from 'context/gameContext'

import { FormInstructions, Map } from 'components'

import 'styles/App.css'
import { getResults } from 'utils/helpers/outputResult'
import Output from 'components/Output'

const App = () => {
  const [displayMap, setDisplayMap] = useState(false)
  const [displayResult, setDisplayResult] = useState(false)
  const [elementsOutput, setElementsOutput] = useState<any>([])

  const handleMapCreation = (isInstructionsValid: boolean) => {
    if (isInstructionsValid) setDisplayMap(true)
  }

  const handleResult = (mapElements: Record<string, unknown>) => {
    // setDisplayResult(isEndInstructions)
    const mapElementsOutput = getResults(mapElements)
    setElementsOutput(mapElementsOutput)
    setDisplayResult(true)
  }

  const resetResult = (isAlreadyAMap: boolean) => {
    if (isAlreadyAMap) setDisplayResult(false)
  }

  return (
    <div className="App">
      <GameProvider>
        <div className="GameContainer">
          <div>Treasure map</div>
          <div>
            <FormInstructions handleMapCreation={handleMapCreation} resetResult={resetResult} />
          </div>
          {displayMap && <Map handleResult={handleResult} />}
          {displayResult && (
            <div className="outputContainer">
              <div className="outputTitle">Résultat</div>
              <Output elementsOutput={elementsOutput} />
            </div>
          )}
        </div>
      </GameProvider>
    </div>
  )
}

export default App
