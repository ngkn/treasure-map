import AdventurerType from 'interfaces/AdventurerType'
import MountainType from 'interfaces/MountainType'
import TreasureType from 'interfaces/TreasureType'

type MapType = {
  id?: string
  idTreasure?: string
  name?: string
  type?: string
  symbol?: string
  isAdventurer?: boolean
  x?: number
  y?: number
  total?: number
  orientation?: string
  movements?: string
  priority?: number
  treasureRecovered?: number
}[][]

export type MapComponentType = {
  handleResult: (mapElements: MapElementsType) => void
}

export type MapElementsType = {
  widthMap: number
  lengthMap: number
  mountains: MountainType[]
  treasures: TreasureType[]
  adventurers: AdventurerType[]
}

export type MapElementsOutputType = {
  mapLine: string
  mountainsLine: string[]
  treasuresLine: string[]
  adventurersLine: string[]
}

export default MapType
