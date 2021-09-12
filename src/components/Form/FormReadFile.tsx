import { FormEvent, useRef, useState } from 'react'

import { instructionsValidation, instructionsToArray } from 'utils/helpers/entryFile'

import { MESSAGE_FILE_SUCCESS, MESSAGE_FILE_ERROR } from 'config/constants'

function FormReadFile() {
  const refTextArea = useRef<HTMLTextAreaElement>(null) // Uncontrolled Components
  const [createMap, setCreateMap] = useState<null | boolean>(null)

  const handleOnSubmit = (event: FormEvent) => {
    if (!refTextArea.current) return

    const instructionsArray = instructionsToArray(refTextArea.current.value)
    const isInstructionsValid = instructionsValidation(instructionsArray)

    setCreateMap(isInstructionsValid)

    event.preventDefault()
  }

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

export default FormReadFile
