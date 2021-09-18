type MapType = {
  id?: string
  idTreasure?: string
  type: string
  symbol: string
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
  handleResult: (mapElements: Record<string, unknown>) => void
}

export default MapType
