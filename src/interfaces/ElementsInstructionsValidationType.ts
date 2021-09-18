import AdventurerType from 'interfaces/AdventurerType'
import MountainType from 'interfaces/MountainType'
import TreasureType from 'interfaces/TreasureType'

type elementsInstructionsValidationType = {
  mountains: MountainType[]
  treasures: TreasureType[]
  adventurers: AdventurerType[]
  isValid: boolean
}

export default elementsInstructionsValidationType
