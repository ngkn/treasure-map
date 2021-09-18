import { createContext, ReactNode, useContext, useState } from 'react'

import GameContextType from 'interfaces/GameContextType'
import MountainType from 'interfaces/MountainType'
import TreasureType from 'interfaces/TreasureType'
import AdventurerType from 'interfaces/AdventurerType'

const GameContext = createContext<GameContextType>(null!)

export function useGame() {
  return useContext(GameContext)
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [widthMap, setWidthMap_] = useState<number>(0)
  const [lengthMap, setLengthMap_] = useState<number>(0)
  const [mountains, setMountains_] = useState<MountainType[]>([])
  const [treasures, setTreasures_] = useState<TreasureType[]>([])
  const [adventurers, setAdventurer_] = useState<AdventurerType[]>([])

  const [isAlreadyAMap, setisAlreadyAMap_] = useState(false)

  function setisAlreadyAMap(boolean: boolean) {
    setisAlreadyAMap_(boolean)
  }

  function setWidthMap(number: number) {
    setWidthMap_(number)
  }

  function setLengthMap(number: number) {
    setLengthMap_(number)
  }

  function setMountains(mountain: MountainType[]) {
    setMountains_(mountain)
  }

  function setTreasures(treasure: TreasureType[]) {
    setTreasures_(treasure)
  }

  function setAdventurers(adventurer: AdventurerType[]) {
    setAdventurer_(adventurer)
  }

  function getRemainingMoves() {
    let total
    if (adventurers) {
      const moves = adventurers.map((adventurer) => adventurer.movements.length)

      total = moves.reduce((a, b) => a + b, 0)
    }
    return total || 0
  }

  return (
    <GameContext.Provider
      value={{
        widthMap,
        lengthMap,
        mountains,
        treasures,
        adventurers,
        isAlreadyAMap,
        setWidthMap,
        setLengthMap,
        setMountains,
        setTreasures,
        setAdventurers,
        getRemainingMoves,
        setisAlreadyAMap,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
