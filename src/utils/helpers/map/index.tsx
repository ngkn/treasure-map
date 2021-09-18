import AdventurerType from 'interfaces/AdventurerType'
import MapType from 'interfaces/MapType'
import MountainType from 'interfaces/MountainType'
import TreasureType from 'interfaces/TreasureType'

export function addMountain(map: MapType, mountains: MountainType[]): MapType {
  const newMap = [...map]

  mountains.forEach((mountain: MountainType) => {
    newMap[mountain.vertically][mountain.horizontally].type = 'mountain'
    newMap[mountain.vertically][mountain.horizontally].symbol = 'M'
  })

  return newMap
}

export function addTreasure(map: MapType, treasures: TreasureType[]): MapType {
  const newMap = [...map]

  treasures.forEach((treasure: TreasureType) => {
    newMap[treasure.vertically][treasure.horizontally].idTreasure = treasure.idTreasure
    newMap[treasure.vertically][treasure.horizontally].type = 'treasure'
    newMap[treasure.vertically][treasure.horizontally].symbol = `T(${treasure.total})`
    newMap[treasure.vertically][treasure.horizontally].total = treasure.total
  })

  return newMap
}

export function addAdventurer(map: MapType, adventurers: AdventurerType[]): MapType {
  const newMap = [...map]

  adventurers.forEach((adventurer: AdventurerType) => {
    newMap[adventurer.vertically][adventurer.horizontally].id = adventurer.id
    newMap[adventurer.vertically][adventurer.horizontally].type = 'adventurer'
    newMap[adventurer.vertically][adventurer.horizontally].symbol = `A(${adventurer.name})`
    newMap[adventurer.vertically][adventurer.horizontally].orientation = adventurer.orientation
    newMap[adventurer.vertically][adventurer.horizontally].movements = adventurer.movements
    newMap[adventurer.vertically][adventurer.horizontally].priority = adventurer.priority
    newMap[adventurer.vertically][adventurer.horizontally].treasureRecovered = 0
    newMap[adventurer.vertically][adventurer.horizontally].isAdventurer = true
  })

  return newMap
}
