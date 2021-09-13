import MountainType from 'interfaces/MountainType'

type GameContextType = {
  widthMap: number
  lengthMap: number
  mountains: MountainType[]
  setWidthMap: (number: number) => void
  setLengthMap: (number: number) => void
  setMountains: (mountain: MountainType[]) => void
}

export default GameContextType
