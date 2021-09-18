export function getResults(mapElements: Record<string, any>) {
  const mapLine = `C - ${mapElements.widthMap} - ${mapElements.lengthMap}`
  let mountainsLine = []
  let treasuresLine = []
  let adventurersLine = []

  if (mapElements.mountains.length) {
    mountainsLine = mapElements.mountains.map(
      (mountain: any) => `M - ${mountain.horizontally} - ${mountain.vertically}`,
    )
  }
  if (mapElements.treasures.length) {
    treasuresLine = mapElements.treasures.map(
      (treasure: any) => `T - ${treasure.horizontally} - ${treasure.vertically} - ${treasure.total}`,
    )
  }
  if (mapElements.adventurers.length) {
    adventurersLine = mapElements.adventurers.map(
      (adventurer: any) =>
        `A - ${adventurer.name} - ${adventurer.horizontally} - ${adventurer.vertically} - ${adventurer.orientation} - ${adventurer.treasureRecovered}`,
    )
  }

  return { mapLine, mountainsLine, treasuresLine, adventurersLine }
}
