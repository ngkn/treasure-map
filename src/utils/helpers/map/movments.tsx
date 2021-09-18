/* eslint-disable no-param-reassign */
import AdventurerType from 'interfaces/AdventurerType'
import MapType from 'interfaces/MapType'
import MoveAdventurersType from 'interfaces/MoveAdventurersType'
import NextCoordsType from 'interfaces/NextCoordsType'
import TreasureType from 'interfaces/TreasureType'

function checkDuplicateMove(adventurersWithMovementForward: AdventurerType[]) {
  let nextCoords: NextCoordsType = []
  const adventurersWithMovementForwardCopy = [...adventurersWithMovementForward]

  // Adventurers array with their future coords
  adventurersWithMovementForwardCopy.forEach((adventurer) => {
    const adventurerCopy = { ...adventurer }

    if (adventurerCopy.orientation === 'N') {
      adventurerCopy.horizontally -= 1
    }
    if (adventurerCopy.orientation === 'S') {
      adventurerCopy.horizontally += 1
    }

    if (adventurerCopy.orientation === 'E') {
      adventurerCopy.vertically += 1
    }
    if (adventurerCopy.orientation === 'O') {
      adventurerCopy.vertically -= 1
    }

    const nextMove = {
      id: adventurer.id,
      nextMove: String(adventurerCopy.horizontally) + String(adventurerCopy.vertically), // String to compare duplicate later
      priority: adventurer.priority,
    }

    nextCoords = [...nextCoords, nextMove]
  })

  // Regroup adventurers that will go in the same case in different groups
  const isDuplicates = [
    ...nextCoords
      .reduce(
        (previousValue: any, currentValue: any) =>
          previousValue.set(
            currentValue.nextMove,
            (previousValue.get(currentValue.nextMove) || []).concat(currentValue),
          ),
        new Map(),
      )
      .values(),
  ]

  // Keep all adventurers that will move this turns
  const adventurersPriority = isDuplicates.map((array) => {
    const adventurersThatWillMove = array.reduce(function (previousValue: any, currentValue: any) {
      return currentValue.priority < previousValue.priority ? currentValue : previousValue
    })

    return adventurersThatWillMove
  })

  return adventurersPriority
}

function moveForward(adventurer: AdventurerType, widthMap: number, lengthMap: number) {
  const adventurerCopy = { ...adventurer }

  if (adventurerCopy.orientation === 'N') {
    if (adventurerCopy.horizontally > 0) adventurerCopy.horizontally -= 1
  }
  if (adventurerCopy.orientation === 'S') {
    if (adventurerCopy.horizontally < widthMap - 1) adventurerCopy.horizontally += 1
  }
  if (adventurerCopy.orientation === 'E') {
    if (adventurerCopy.vertically < lengthMap - 1) adventurerCopy.vertically += 1
  }
  if (adventurerCopy.orientation === 'O') {
    if (adventurerCopy.vertically > 0) adventurerCopy.vertically -= 1
  }

  return adventurerCopy
}

function filterMovement(
  mapCopy: MapType,
  adventurersWithMovementForward: AdventurerType[],
  adventurersCopy: AdventurerType[],
  treasures: TreasureType[],
  widthMap: number,
  lengthMap: number,
) {
  const adventurersWithMovementForwardCopy = [...adventurersWithMovementForward]

  const mapClone = [...mapCopy]

  const adventurersClone = [...adventurersCopy]

  const treasuresClone = [...treasures]

  const adventurersThatWillMove: AdventurerType[] = checkDuplicateMove(adventurersWithMovementForwardCopy)

  adventurersClone.forEach((adventurer: AdventurerType) => {
    adventurersThatWillMove.forEach((adventurerMove: AdventurerType) => {
      if (adventurerMove.id === adventurer.id) {
        // Old and news Coords of an adventurer
        const adventurerAfterMoved = moveForward(adventurer, widthMap, lengthMap)
        const adventurerOldCoords = { ...adventurer }

        const mapBox = mapClone[adventurer.vertically][adventurer.horizontally]
        const mapBoxAfterMoved = mapClone[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally]
        const mapBoxOldCoords = mapClone[adventurerOldCoords.vertically][adventurerOldCoords.horizontally]

        // Mean that the adventurer want to move on a case which contain another adventurer without doesn't have movements anymore
        if (mapBoxAfterMoved.isAdventurer || mapBoxAfterMoved.type === 'mountain') {
          adventurer.movements = adventurer.movements.substring(1)
        }
        // The adventurer will move on all others cases: plain, treasure
        else {
          adventurer.horizontally = adventurerAfterMoved.horizontally
          adventurer.vertically = adventurerAfterMoved.vertically

          // Move the adventurer on map box with a type Plain or Treasure
          if (mapBoxAfterMoved.type === 'treasure' || mapBoxAfterMoved.type === 'treasureAdventurer') {
            if (mapBoxAfterMoved.total) {
              mapBoxAfterMoved.total -= 1
              adventurer.treasureRecovered += 1

              // Update a treasure in treasures array
              treasuresClone.forEach((treasure) => {
                if (treasure.idTreasure === mapBoxAfterMoved.idTreasure) {
                  if (treasure.total > 0) treasure.total -= 1
                }
              })
            }

            // Add property of the player in the array case
            mapBoxAfterMoved.type = 'treasureAdventurer'
            mapBox.id = adventurer.id
            mapBox.type = 'adventurer'
            mapBox.symbol = `A(${adventurer.name})`
            mapBox.orientation = adventurer.orientation
            mapBox.movements = adventurer.movements
            mapBox.priority = adventurer.priority
            mapBox.treasureRecovered = adventurer.treasureRecovered + 1
            mapBox.isAdventurer = true
          }

          // Add properties of the player in an array case of type plain
          if (mapBoxAfterMoved.type === 'plain') {
            adventurer.horizontally = adventurerAfterMoved.horizontally
            adventurer.vertically = adventurerAfterMoved.vertically

            mapClone[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally] = {}
            mapBoxAfterMoved.id = adventurer.id
            mapBoxAfterMoved.type = 'adventurer'
            mapBoxAfterMoved.symbol = `A(${adventurer.name})`
            mapBoxAfterMoved.orientation = adventurer.orientation
            mapBoxAfterMoved.movements = adventurer.movements
            mapBoxAfterMoved.priority = adventurer.priority
            mapBoxAfterMoved.treasureRecovered = adventurer.treasureRecovered
            mapClone[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].isAdventurer = true
          }

          // Reset previous case after adventurer move
          if (mapBoxOldCoords.type !== 'treasureAdventurer') {
            mapClone[adventurerOldCoords.vertically][adventurerOldCoords.horizontally] = {
              type: 'plain',
              symbol: '*',
              isAdventurer: false,
              x: adventurerOldCoords.horizontally,
              y: adventurerOldCoords.vertically,
            }
          }

          // Update treasure box after an adventurer leave it
          if (mapBoxOldCoords.type === 'treasureAdventurer') {
            const { idTreasure } = mapClone[adventurerOldCoords.vertically][adventurerOldCoords.horizontally]

            mapClone[adventurerOldCoords.vertically][adventurerOldCoords.horizontally] = {}

            treasuresClone.forEach((treasure: any) => {
              if (treasure.idTreasure === idTreasure) {
                mapClone[adventurerOldCoords.vertically][adventurerOldCoords.horizontally] = {
                  idTreasure: treasure.idTreasure,
                  type: 'treasure',
                  symbol: `T(${treasure.total})`,
                  total: treasure.total,
                }
              }
            })
          }

          adventurer.movements = adventurer.movements.substring(1)
        }
      }
    })
  })
  return { adventurersClone, mapClone }
}

export function changeOrientation(firstMovement: string, orientation: string): string {
  switch (true) {
    case orientation === 'N' && firstMovement === 'D':
      return 'E'
    case orientation === 'N' && firstMovement === 'G':
      return 'O'
    case orientation === 'S' && firstMovement === 'D':
      return 'O'
    case orientation === 'S' && firstMovement === 'G':
      return 'E'
    case orientation === 'E' && firstMovement === 'D':
      return 'S'
    case orientation === 'E' && firstMovement === 'G':
      return 'N'
    case orientation === 'O' && firstMovement === 'D':
      return 'N'
    case orientation === 'O' && firstMovement === 'G':
      return 'S'
    default:
      return ''
  }
}

export function moveAdventurers({ map, widthMap, lengthMap, adventurers, treasures }: MoveAdventurersType): {
  mapCopy: MapType
  adventurersCopy: AdventurerType[]
} {
  let adventurersCopy: AdventurerType[] = [...adventurers]

  let adventurersWithMovementForward: AdventurerType[] = []

  let mapCopy: MapType = [...map]

  adventurersCopy.forEach((adventurer: AdventurerType) => {
    const { movements } = adventurer
    const firstMovement = movements.slice(0, 1)

    if (firstMovement !== 'A' && firstMovement) {
      const newOrientation = changeOrientation(firstMovement, adventurer.orientation)
      adventurer.orientation = newOrientation
      adventurer.movements = adventurer.movements.substring(1)
    } else if (firstMovement.length) {
      adventurersWithMovementForward = [...adventurersWithMovementForward, adventurer]
    }
  })

  if (adventurersWithMovementForward.length) {
    const { adventurersClone, mapClone } = filterMovement(
      mapCopy,
      adventurersWithMovementForward,
      adventurersCopy,
      treasures,
      widthMap,
      lengthMap,
    )

    adventurersCopy = [...adventurersClone]
    mapCopy = [...mapClone]
  }

  return { mapCopy, adventurersCopy }
}
