import AdventurerType from 'interfaces/AdventurerType'
import MountainType from 'interfaces/MountainType'
import TreasureType from 'interfaces/TreasureType'

type handleResultType = {
  widthMap: number
  lengthMap: number
  mountains?: MountainType[]
  treasures?: TreasureType[]
  adventurers?: AdventurerType[]
}

export default handleResultType
