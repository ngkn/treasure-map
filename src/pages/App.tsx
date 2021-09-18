import { useState } from 'react'
import { GameProvider } from 'context/gameContext'

import { FormInstructions, Map } from 'components'
import Output from 'components/Output'

import { getResults } from 'utils/helpers/outputResult'

import 'styles/App.css'
import { MapElementsOutputType, MapElementsType } from 'interfaces/MapType'

const App = () => {
  const [displayMap, setDisplayMap] = useState(false)
  const [displayResult, setDisplayResult] = useState(false)
  const [elementsOutput, setElementsOutput] = useState<MapElementsOutputType | null | undefined>()

  const handleMapCreation = (isInstructionsValid: boolean) => isInstructionsValid && setDisplayMap(true)

  const resetResult = (isAlreadyAMap: boolean) => isAlreadyAMap && setDisplayResult(false)

  const handleResult = (mapElements: MapElementsType) => {
    const mapElementsOutput = getResults(mapElements)

    setElementsOutput(mapElementsOutput)
    setDisplayResult(true)
  }

  return (
    <div className="App">
      <GameProvider>
        <div className="GameContainer">
          <h1>Treasure map</h1>
          <div>
            <FormInstructions handleMapCreation={handleMapCreation} resetResult={resetResult} />
          </div>
          {displayMap && <Map handleResult={handleResult} />}
          {displayResult && (
            <div className="outputContainer">
              <h3 className="outputTitle">Résultat</h3>
              <Output elementsOutput={elementsOutput} />
            </div>
          )}
        </div>
      </GameProvider>
    </div>
  )
}

export default App
