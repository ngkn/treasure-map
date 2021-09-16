import { useGame } from 'context/gameContext'
import React, { useEffect, useState } from 'react'

import { addAdventurer, addMountain, addTreasure } from 'utils/helpers/map'
import { moveAdventurers } from 'utils/helpers/map/movments'

const Map = () => {
  const { widthMap, lengthMap, mountains, treasures, adventurers, getRemainingMoves, setAdventurers } = useGame()

  const [map, setMap] = useState(
    new Array(lengthMap).fill(null).map((_, x: number) =>
      new Array(widthMap).fill(null).map((__, y: number) => ({
        type: 'plain',
        symbol: '*',
        isAdventurer: false,
        x: x as number,
        y: y as number,
      })),
    ),
  )

  const [remaininMoves, setRemaininMoves] = useState<number>()

  // Gestion des éléments dans la map
  useEffect(() => {
    if (mountains) {
      const newMap = addMountain(map, mountains)
      setMap([...newMap])
    }
    if (treasures) {
      const newMap = addTreasure(map, treasures)
      setMap([...newMap])
    }
    if (adventurers) {
      const newMap = addAdventurer(map, adventurers)
      setMap([...newMap])

      setRemaininMoves(getRemainingMoves())
    }

    console.log('remaininMoves :>> ', remaininMoves)
  }, [mountains, treasures, adventurers])
  //   }, [mountains, treasures, adventurers]) // A retirer plus tard ?

  // Gestion des mouvements dans la map
  useEffect(() => {
    if (remaininMoves) {
      const id = setTimeout(() => {
        const { mapUpdated, adventurersUpdated } = moveAdventurers(map, adventurers, widthMap, lengthMap)

        setMap([...mapUpdated])
        setAdventurers([...adventurersUpdated])
      }, 1000)

      return () => clearTimeout(id)
    }
    return undefined
  }, [remaininMoves])

  // ----test---

  return (
    <div className="mapContainer">
      <div className="mapWrapper">
        {map &&
          map.map((items, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`${items}-${index}`} className="mapItem">
                {items.map((subItems, sIndex) => {
                  // eslint-disable-next-line react/no-array-index-key
                  return <div key={`${subItems}-${sIndex}`}> {subItems.symbol} </div>
                })}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Map
