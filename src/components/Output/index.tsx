const Output = ({ elementsOutput }: any) => {
  const map = elementsOutput.mapLine
  const mountains = elementsOutput.mountainsLine || []
  const treasures = elementsOutput.treasuresLine || []
  const adventurers = elementsOutput.adventurersLine || []

  return (
    <div>
      <div>{map}</div>
      {mountains.length && mountains.map((mountain: any) => <div>{mountain}</div>)}
      {treasures.length && treasures.map((treasure: any) => <div>{treasure}</div>)}
      {adventurers.length && adventurers.map((adventurer: any) => <div>{adventurer}</div>)}
    </div>
  )
}

export default Output
