import { ReactElement } from 'react'

import { MapElementsOutputType } from 'interfaces/MapType'

// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid } from 'uuid'

const Output = ({ elementsOutput }: Record<string, MapElementsOutputType | undefined | null>): ReactElement => {
  const map = elementsOutput && elementsOutput.mapLine
  const mountains = (elementsOutput && elementsOutput.mountainsLine) || null
  const treasures = (elementsOutput && elementsOutput.treasuresLine) || null
  const adventurers = (elementsOutput && elementsOutput.adventurersLine) || null

  return (
    <div className="outputWrapper">
      <div>{map}</div>
      {mountains && mountains.map((mountain: string) => <div key={uuid()}>{mountain}</div>)}
      {treasures && treasures.map((treasure: string) => <div key={uuid()}>{treasure}</div>)}
      {adventurers && adventurers.map((adventurer: string) => <div key={uuid()}>{adventurer}</div>)}
    </div>
  )
}

export default Output
