import { FormEvent, useEffect, useRef, useState } from 'react'

import { instructionsValidation, instructionsToArray } from 'utils/helpers/entryInstructions'

import { MESSAGE_FILE_SUCCESS, MESSAGE_FILE_ERROR } from 'config/constants'

import FormInstructionsType from 'interfaces/FormInstructionsType'
import { useGame } from 'context/gameContext'

const FormInstructions = ({ handleMapCreation }: FormInstructionsType) => {
  const refTextArea = useRef<HTMLTextAreaElement>(null) // Uncontrolled Components
  const [createMap, setCreateMap] = useState<null | boolean>(null)
  const { setWidthMap, setLengthMap, setMountains, setTreasures, setAdventurers } = useGame()

  const handleOnSubmit = (event: FormEvent) => {
    if (!refTextArea.current) return

    const instructionsArray = instructionsToArray(refTextArea.current.value)
    const isInstructionsValid = instructionsValidation(instructionsArray)

    if (
      Object.keys(isInstructionsValid).length !== 0 &&
      isInstructionsValid.constructor === Object &&
      isInstructionsValid.isElementsValid.isElementsValid
    ) {
      setWidthMap(isInstructionsValid.mapValid.width)
      setLengthMap(isInstructionsValid.mapValid.length)
      setMountains(isInstructionsValid.isElementsValid.elements.mountains)
      setTreasures(isInstructionsValid.isElementsValid.elements.treasures)
      setAdventurers(isInstructionsValid.isElementsValid.elements.adventurers)
      setCreateMap(true)
    }

    // setCreateMap(isInstructionsValid)

    event.preventDefault()
  }

  useEffect(() => {
    if (createMap) handleMapCreation(createMap)
  }, [createMap])

  return (
    <>
      <form data-test="formEntryFile" onSubmit={handleOnSubmit}>
        <div>
          <textarea name="textEntryFile" cols={30} rows={10} ref={refTextArea} />
        </div>
        <button type="submit">Valider</button>
      </form>
      {createMap !== null && <div>{createMap ? MESSAGE_FILE_SUCCESS : MESSAGE_FILE_ERROR}</div>}
    </>
  )
}

// getDataFile
// dataFileValidation

export default FormInstructions
