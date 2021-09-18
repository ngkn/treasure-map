import AdventurerType from 'interfaces/AdventurerType'
import { MapElementsType } from 'interfaces/MapType'
import MountainType from 'interfaces/MountainType'
import TreasureType from 'interfaces/TreasureType'

export function getResults(mapElements: MapElementsType) {
  const mapLine = `C - ${mapElements.widthMap} - ${mapElements.lengthMap}`
  let mountainsLine: string[] = []
  let treasuresLine: string[] = []
  let adventurersLine: string[] = []

  if (mapElements.mountains.length) {
    mountainsLine = mapElements.mountains.map(
      (mountain: MountainType) => `M - ${mountain.horizontally} - ${mountain.vertically}`,
    )
  }
  if (mapElements.treasures.length) {
    treasuresLine = mapElements.treasures.map(
      (treasure: TreasureType) => `T - ${treasure.horizontally} - ${treasure.vertically} - ${treasure.total}`,
    )
  }
  if (mapElements.adventurers.length) {
    adventurersLine = mapElements.adventurers.map(
      (adventurer: AdventurerType) =>
        `A - ${adventurer.name} - ${adventurer.horizontally} - ${adventurer.vertically} - ${adventurer.orientation} - ${adventurer.treasureRecovered}`,
    )
  }

  return { mapLine, mountainsLine, treasuresLine, adventurersLine }
}
