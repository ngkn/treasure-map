export function addMountain(map: any, mountains: any) {
  const newMap = [...map]

  mountains.forEach((mountain: any) => {
    newMap[mountain.vertically][mountain.horizontally].id = 'id'
    newMap[mountain.vertically][mountain.horizontally].type = 'mountain'
    newMap[mountain.vertically][mountain.horizontally].symbol = 'M'
  })

  return newMap
}

export function addTreasure(map: any, treasures: any) {
  const newMap = [...map]

  treasures.forEach((treasure: any) => {
    newMap[treasure.vertically][treasure.horizontally].idTreasure = treasure.idTreasure
    newMap[treasure.vertically][treasure.horizontally].type = 'treasure'
    newMap[treasure.vertically][treasure.horizontally].symbol = `T(${treasure.total})`
    newMap[treasure.vertically][treasure.horizontally].total = treasure.total
  })

  return newMap
}

export function addAdventurer(map: any, adventurers: any) {
  const newMap = [...map]

  adventurers.forEach((adventurer: any) => {
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
