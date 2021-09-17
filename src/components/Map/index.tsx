import { useGame } from 'context/gameContext'
import { useEffect, useState } from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid } from 'uuid'

import { addAdventurer, addMountain, addTreasure } from 'utils/helpers/map'
import { moveAdventurers } from 'utils/helpers/map/movments'

const Map = ({ handleResult }: any) => {
  const {
    widthMap,
    lengthMap,
    mountains,
    treasures,
    adventurers,
    isAlreadyAMap,
    getRemainingMoves,
    setAdventurers,
    setisAlreadyAMap,
  } = useGame()

  const mapDefault = new Array(lengthMap).fill(null).map((_, x: number) =>
    new Array(widthMap).fill(null).map((__, y: number) => ({
      type: 'plain',
      symbol: '*',
      isAdventurer: false,
      x: x as number,
      y: y as number,
    })),
  )

  const [map, setMap] = useState(mapDefault)

  const [remaininMoves, setRemaininMoves] = useState<number>()

  const resetMap = () => {
    setMap(mapDefault)
    setisAlreadyAMap(false)
  }

  // Gestion des éléments dans la map
  useEffect(() => {
    if (isAlreadyAMap) {
      resetMap()
    } else {
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
    }
  }, [mountains, treasures, adventurers, isAlreadyAMap])
  //  }, [mountains, treasures, adventurers]) // A retirer plus tard ?

  // Gestion des mouvements dans la map
  useEffect(() => {
    if (remaininMoves) {
      const id = setTimeout(() => {
        const { mapUpdated, adventurersUpdated } = moveAdventurers(map, adventurers, widthMap, lengthMap, treasures)

        setMap([...mapUpdated])
        setAdventurers([...adventurersUpdated])
      }, 1000)

      return () => clearTimeout(id)
    }
    if (remaininMoves === 0) {
      handleResult({ widthMap, lengthMap, mountains, treasures, adventurers })
      console.log('remaininMoves :>> ', remaininMoves)
    }

    return undefined
  }, [remaininMoves])

  // ----test---

  return (
    <div className="mapContainer">
      <div className="mapWrapper">
        {map &&
          map.map((items, indexFirst) => {
            return (
              <div className="horizontallyContainer">
                <div className="indexHorizontally">{indexFirst}</div>
                <div key={uuid()} className="mapItemContainer">
                  {items.map((subItems, sIndex) => {
                    return (
                      <div className="verticallyContainer">
                        <div key={uuid()} className="mapItem">
                          {subItems.symbol}
                        </div>
                        {indexFirst === 0 && <div className="indexVertically">{sIndex}</div>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Map
