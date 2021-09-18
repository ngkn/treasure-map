import AdventurerType from 'interfaces/AdventurerType'
import MapType from 'interfaces/MapType'
import TreasureType from 'interfaces/TreasureType'

type MoveAdventurersType = {
  map: MapType
  widthMap: number
  lengthMap: number
  adventurers: AdventurerType[]
  treasures: TreasureType[]
}

export default MoveAdventurersType
