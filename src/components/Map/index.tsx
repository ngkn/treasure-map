import { useEffect, useState } from 'react'

import { useGame } from 'context/gameContext'

// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid } from 'uuid'

import { addAdventurer, addMountain, addTreasure } from 'utils/helpers/map'
import { moveAdventurers } from 'utils/helpers/map/movments'

import MapType, { MapComponentType } from 'interfaces/MapType'

const Map = ({ handleResult }: MapComponentType) => {
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

  const [map, setMap] = useState<MapType>(mapDefault)

  const [remaininMoves, setRemaininMoves] = useState<number>()

  const resetMap = () => {
    setMap(mapDefault)
    setisAlreadyAMap(false)
  }

  // Gestion de l'ajout des éléments dans la map
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

      if (adventurers.length === 0) handleResult({ widthMap, lengthMap, mountains, treasures, adventurers })
    }
  }, [mountains, treasures, adventurers, isAlreadyAMap])

  // Gestion des mouvements dans la map
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (remaininMoves) {
      const id = setTimeout(() => {
        const { mapCopy, adventurersCopy } = moveAdventurers({ map, widthMap, lengthMap, adventurers, treasures })

        setMap([...mapCopy])
        setAdventurers([...adventurersCopy])
      }, 1000)

      return () => clearTimeout(id)
    }

    handleResult({ widthMap, lengthMap, mountains, treasures, adventurers })
  }, [remaininMoves])

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
