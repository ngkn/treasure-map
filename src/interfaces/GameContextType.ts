import AdventurerType from 'interfaces/AdventurerType'
import MountainType from 'interfaces/MountainType'
import TreasureType from 'interfaces/TreasureType'

type GameContextType = {
  widthMap: number
  lengthMap: number
  mountains: MountainType[]
  treasures: TreasureType[]
  adventurers: AdventurerType[]
  isAlreadyAMap: boolean
  setWidthMap: (number: number) => void
  setLengthMap: (number: number) => void
  setMountains: (mountain: MountainType[]) => void
  setTreasures: (treasure: TreasureType[]) => void
  setAdventurers: (adventurer: AdventurerType[]) => void
  getRemainingMoves: () => number
  setisAlreadyAMap: (boolean: boolean) => void
}

export default GameContextType
