import { useGame } from 'context/gameContext'
import React, { useEffect, useState } from 'react'

import { addAdventurer, addMountain, addTreasure } from 'utils/helpers/map'

const Map = () => {
  const { widthMap, lengthMap, mountains, treasures, adventurers } = useGame()

  const [map, setMap] = useState(
    new Array(widthMap).fill(null).map((_, x: number) =>
      new Array(lengthMap).fill(null).map((__, y: number) => ({
        type: 'plain',
        symbol: '*',
        isAdventurer: false,
        x: x as number,
        y: y as number,
      })),
    ),
  )

  useEffect(() => {
    if (mountains) {
      const newMap = addMountain(map, mountains)
      setMap([...map, newMap])
    }
    if (treasures) {
      const newMap = addTreasure(map, treasures)
      setMap([...map, newMap])
    }
    if (adventurers) {
      const newMap = addAdventurer(map, adventurers)
      setMap([...map, newMap])
    }
  }, [mountains, treasures, adventurers])

  // const addMountain = () => {
  //   mountains.forEach((mountain) => {
  //     setMap(
  //       map.map((x) =>
  //         x.map((y) =>
  //           y.x === mountain.horizontally && y.y === mountain.vertically
  //             ? { ...y, type: 'mountain', symbol: 'M' }
  //             : { ...y },
  //         ),
  //       ),
  //     )
  //   })
  // }

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
