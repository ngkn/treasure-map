import { validateTreasure } from 'utils/validations/regex'

describe('Structure line that define a treasure: T - x - x - x', () => {
  it('should return true for the structure: T - 3 - 4 - 1', () => {
    const treasureStructure = 'T - 3 - 4 - 1'
    const isTreasureValid = validateTreasure(treasureStructure)

    expect(isTreasureValid).toBe(true)
  })

  it('should return true for the structure: T - 3 - 4 - 0', () => {
    const treasureStructure = 'T - 3 - 4 - 0'
    const isTreasureValid = validateTreasure(treasureStructure)

    expect(isTreasureValid).toBe(false)
  })

  it('should return true for the structure: T - 3 - 4', () => {
    const treasureStructure = 'T - 3 - 4'
    const isTreasureValid = validateTreasure(treasureStructure)

    expect(isTreasureValid).toBe(false)
  })

  it('should return false for the structure: A - 3 - 4 - 0', () => {
    const treasureStructure = 'A - 3 - 4 - 0'
    const isTreasureValid = validateTreasure(treasureStructure)

    expect(isTreasureValid).toBe(false)
  })

  it('should return false for the structure: T -  - 4 - 0', () => {
    const treasureStructure = 'T -  - 4 - 0'
    const isTreasureValid = validateTreasure(treasureStructure)

    expect(isTreasureValid).toBe(false)
  })

  it('should return false for the structure: T -  -  - ', () => {
    const treasureStructure = 'T -  -  -'
    const isTreasureValid = validateTreasure(treasureStructure)

    expect(isTreasureValid).toBe(false)
  })
})
