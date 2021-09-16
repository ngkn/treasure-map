/* eslint-disable no-param-reassign */
import AdventurerType from 'interfaces/AdventurerType'

function checkDuplicateMove(adventurersWithA: any) {
  let nextCoords: any = []
  const adventurersA = [...adventurersWithA]

  adventurersA.forEach((adventurer) => {
    const adventurerNew = { ...adventurer }

    if (adventurerNew.orientation === 'N') {
      adventurerNew.horizontally -= 1
    }
    if (adventurerNew.orientation === 'S' && adventurerNew.id === 'adventurer-3') {
      adventurerNew.horizontally += 1
    }

    if (adventurerNew.orientation === 'E') {
      adventurerNew.vertically += 1
    }
    if (adventurerNew.orientation === 'O') {
      adventurerNew.vertically -= 1
    }

    const nextMove = {
      id: adventurer.id,
      nextMove: String(adventurerNew.horizontally) + String(adventurerNew.vertically),
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

  // Keep all adventurer that will move this turns
  const t = isDuplicates.map((arr) => {
    const maxObj = arr.reduce(function (max: any, obj: any) {
      return obj.priority < max.priority ? obj : max
    })

    return maxObj
  })

  return t
}

function moveForward(adventurer: any, widthMap: any, lengthMap: any) {
  const adv = { ...adventurer }

  if (adv.orientation === 'N') {
    if (adv.horizontally > 0) adv.horizontally -= 1
  }
  if (adv.orientation === 'S') {
    if (adv.horizontally < widthMap - 1) adv.horizontally += 1
  }
  if (adv.orientation === 'E') {
    if (adv.vertically < lengthMap - 1) adv.vertically += 1
  }
  if (adv.orientation === 'O') {
    if (adv.vertically > 0) adv.vertically -= 1
  }

  return adv
}

function filterMovement(
  adventurersWithA: any,
  adventurersUpdated: any,
  mapUpdated: any,
  widthMap: any,
  lengthMap: any,
  treasures: any,
) {
  const adventurersNew = [...adventurersWithA]

  const mapUp = [...mapUpdated]
  const advUpdateAgain = [...adventurersUpdated]

  const treasuresUpdt = [...treasures]

  const adventurerThatWillMove: any = checkDuplicateMove(adventurersNew)

  advUpdateAgain.forEach(
    (adventurer: any) => {
      adventurerThatWillMove.forEach((advMove: any) => {
        if (advMove.id === adventurer.id) {
          // Old and news Coord of adventurer
          const adventurerAfterMoved = moveForward(adventurer, widthMap, lengthMap)
          const adventurerOldCoords = { ...adventurer }

          // Mean that the adventurer want to move on a case which contain another adventurer without doesn't have movements anymore
          if (
            mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].isAdventurer ||
            mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].type === 'mountain'
          ) {
            adventurer.movements = adventurer.movements.substring(1)
          }
          // The adventurer will move on all others cases: plain, treasure
          else {
            // -- Move the adventurer on map Plain or Treasure
            if (mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].type === 'treasure') {
              if (mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].total > 0) {
                mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].total -= 1
                adventurer.treasureRecovered += 1
                adventurer.horizontally = adventurerAfterMoved.horizontally
                adventurer.vertically = adventurerAfterMoved.vertically

                // Update treasure
                treasuresUpdt.forEach((treasure) => {
                  if (
                    treasure.idTreasure ===
                    mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].idTreasure
                  ) {
                    // idTreasure
                    if (treasure.total > 0) treasure.total -= 1
                  }
                })

                // Add property of the player in the array case
                mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].type = 'treasureAdventurer'
                mapUp[adventurer.vertically][adventurer.horizontally].id = adventurer.id
                mapUp[adventurer.vertically][adventurer.horizontally].type = 'adventurer'
                mapUp[adventurer.vertically][adventurer.horizontally].symbol = `A(${adventurer.name})`
                mapUp[adventurer.vertically][adventurer.horizontally].orientation = adventurer.orientation
                mapUp[adventurer.vertically][adventurer.horizontally].movements = adventurer.movements
                mapUp[adventurer.vertically][adventurer.horizontally].priority = adventurer.priority
                mapUp[adventurer.vertically][adventurer.horizontally].treasureRecovered =
                  adventurer.treasureRecovered + 1
                mapUp[adventurer.vertically][adventurer.horizontally].isAdventurer = true
              }
            }

            if (mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].type === 'plain') {
              adventurer.horizontally = adventurerAfterMoved.horizontally
              adventurer.vertically = adventurerAfterMoved.vertically

              // Add property of the player in the array case
              mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally] = {}
              mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].id = adventurer.id
              mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].type = 'adventurer'
              mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].symbol = `A(${adventurer.name})`
              mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].orientation =
                adventurer.orientation
              mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].movements = adventurer.movements
              mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].priority = adventurer.priority
              mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].treasureRecovered =
                adventurer.treasureRecovered
              mapUp[adventurerAfterMoved.vertically][adventurerAfterMoved.horizontally].isAdventurer = true
            }

            // -- Reset case previous case after adventurer move
            if (mapUp[adventurerOldCoords.vertically][adventurerOldCoords.horizontally].type !== 'treasureAdventurer') {
              mapUp[adventurerOldCoords.vertically][adventurerOldCoords.horizontally] = {
                type: 'plain',
                symbol: '*',
                isAdventurer: false,
                x: adventurerOldCoords.horizontally,
                y: adventurerOldCoords.vertically,
              }
            }
            if (mapUp[adventurerOldCoords.vertically][adventurerOldCoords.horizontally] === 'treasureAdventurer') {
              // Check symbol later
              const { idTreasure } = mapUp[adventurerOldCoords.vertically][adventurerOldCoords.horizontally]

              mapUp[adventurerOldCoords.vertically][adventurerOldCoords.horizontally] = {}

              treasuresUpdt.forEach((treasure: any) => {
                if (treasure.idTreasure === idTreasure) {
                  mapUp[adventurerOldCoords.vertically][adventurerOldCoords.horizontally] = {
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
    },

    // return map, adventurers
  )
  return { advUpdateAgain, mapUp }
}

export function changeOrientation(firstMovement: any, orientation: any): any {
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
      return null
  }
}

export function moveAdventurers(
  map: any,
  adventurers: AdventurerType[],
  widthMap: any,
  lengthMap: any,
  treasures: any,
): Record<string, any> {
  const adventurersWithA: any = []

  let adventurersUpdated: any = [...adventurers]

  let mapUpdated: any = [...map]

  // Check first if there's no conflicts
  // Check only adventurers with A
  adventurersUpdated.forEach((adventurer: any) => {
    const { movements } = adventurer
    const firstMovement = movements.slice(0, 1)
    //    let orientation = adventurer.orientation

    if (firstMovement !== 'A') {
      const newOrientation = changeOrientation(firstMovement, adventurer.orientation)
      adventurer.orientation = newOrientation
      adventurer.movements = adventurer.movements.substring(1)

      //
    } else {
      adventurersWithA.push(adventurer)
    }
  })

  if (adventurersWithA.length) {
    // const t = checkDuplicateMove(adventurersWithA)
    const { advUpdateAgain, mapUp } = filterMovement(
      adventurersWithA,
      adventurersUpdated,
      mapUpdated,
      widthMap,
      lengthMap,
      treasures,
    )

    adventurersUpdated = [...advUpdateAgain]
    mapUpdated = [...mapUp]
  }

  return { mapUpdated, adventurersUpdated }
}

// Check if adventurer with a A will reach the same case
// check if there is any duplicate coords
// Clean the position of adventurers who moved

// if(Check all moves. If duplicate next move)
//     -> avancer le joueur prioritaire
//     -> Mettre en pause lautre

//  if(no duplicate next move)
//     if(next case is empty)
//         -> Avancer le joueur

// if(next move treasure)
//     -> Player get one treasure

// If a player has no longer movmnt and another one is coming, we need to drop movmnt. if(priority has no longer move ? drop all other)
