import { createContext, ReactNode, useContext, useState } from 'react'

import GameContextType from 'interfaces/GameContextType'
import MountainType from 'interfaces/MountainType'

const GameContext = createContext<GameContextType>(null!)

export function useGame() {
  return useContext(GameContext)
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [widthMap, setWidthMap_] = useState<number>(0)
  const [lengthMap, setLengthMap_] = useState<number>(0)
  const [mountains, setMountains_] = useState<MountainType[]>([])

  function setWidthMap(number: number) {
    setWidthMap_(number)
  }

  function setLengthMap(number: number) {
    setLengthMap_(number)
  }

  function setMountains(mountain: MountainType[]) {
    setMountains_(mountain)
  }

  return (
    <GameContext.Provider
      value={{
        widthMap,
        lengthMap,
        mountains,
        setWidthMap,
        setLengthMap,
        setMountains,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
