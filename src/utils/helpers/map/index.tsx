export function addMountain(map: any, mountains: any) {
  const newMap = [...map]

  mountains.forEach((mountain: any) => {
    newMap[mountain.horizontally][mountain.vertically].type = 'mountain'
    newMap[mountain.horizontally][mountain.vertically].symbol = 'M'
  })

  return newMap
}

export function addTreasure(map: any, treasures: any) {
  const newMap = [...map]

  treasures.forEach((treasure: any) => {
    newMap[treasure.horizontally][treasure.vertically].type = 'treasure'
    newMap[treasure.horizontally][treasure.vertically].symbol = `T(${treasure.total})`
    newMap[treasure.horizontally][treasure.vertically].total = treasure.total
  })

  return newMap
}

export function addAdventurer(map: any, adventurers: any) {
  const newMap = [...map]

  console.log('adventurers :>> ', adventurers)

  adventurers.forEach((adventurer: any) => {
    newMap[adventurer.horizontally][adventurer.vertically].type = 'adventurer'
    newMap[adventurer.horizontally][adventurer.vertically].symbol = `A(${adventurer.name})`
    newMap[adventurer.horizontally][adventurer.vertically].orientation = adventurer.orientation
    newMap[adventurer.horizontally][adventurer.vertically].orientation = adventurer.movement
    newMap[adventurer.horizontally][adventurer.vertically].priority = adventurer.priority
  })

  return newMap
}
