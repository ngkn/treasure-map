import { FormEvent, ReactElement, useEffect, useRef, useState } from 'react'

import { useGame } from 'context/gameContext'

import { instructionsValidation, instructionsToArray } from 'utils/helpers/entryInstructions'

import FormInstructionsType from 'interfaces/FormInstructionsType'

const FormInstructions = ({ handleMapCreation, resetResult }: FormInstructionsType): ReactElement => {
  const refTextArea = useRef<HTMLTextAreaElement>(null) // Uncontrolled Components
  const [createMap, setCreateMap] = useState<boolean>(false)

  const { isAlreadyAMap, setWidthMap, setLengthMap, setMountains, setTreasures, setAdventurers, setisAlreadyAMap } =
    useGame()

  const handleOnSubmit = (event: FormEvent) => {
    if (!refTextArea.current) return

    const instructionsArray = instructionsToArray(refTextArea.current.value)
    const instructions = instructionsValidation(instructionsArray)

    const isInstructionsValid = Object.keys(instructions).length !== 0 && instructions.elementsValid.isValid

    if (isInstructionsValid) {
      // Reset map
      if (createMap) setisAlreadyAMap(true)

      setWidthMap(instructions.mapValid.width)
      setLengthMap(instructions.mapValid.length)
      setMountains(instructions.elementsValid.mountains)
      setTreasures(instructions.elementsValid.treasures)
      setAdventurers(instructions.elementsValid.adventurers)

      setCreateMap(true)
    }

    event.preventDefault()
  }

  useEffect(() => {
    if (createMap) handleMapCreation(createMap)

    resetResult(isAlreadyAMap)
  }, [createMap, isAlreadyAMap])

  return (
    <>
      <form data-test="formEntryFile" className="formEntryFileStyle" onSubmit={handleOnSubmit}>
        <div>
          <textarea name="textEntryFile" cols={30} rows={10} ref={refTextArea} />
        </div>
        <button type="submit">Valider</button>
      </form>
      {/* {createMap !== null && <div className="messageForm">{createMap ? MESSAGE_FILE_SUCCESS : MESSAGE_FILE_ERROR}</div>} */}
    </>
  )
}

export default FormInstructions
