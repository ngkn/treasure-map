const Output = ({ elementsOutput }: any) => {
  const map = elementsOutput.mapLine
  const mountains = elementsOutput.mountainsLine
  const treasures = elementsOutput.treasuresLine
  const adventurers = elementsOutput.adventurersLine

  console.log('object')
  console.log('mountains :>> ', elementsOutput.mountainsLine)

  return (
    <div>
      <div>{map}</div>
      {mountains && mountains.map((mountain: any) => <div>{mountain}</div>)}
      {treasures && treasures.map((treasure: any) => <div>{treasure}</div>)}
      {adventurers && adventurers.map((adventurer: any) => <div>{adventurer}</div>)}
    </div>
  )
}

export default Output
