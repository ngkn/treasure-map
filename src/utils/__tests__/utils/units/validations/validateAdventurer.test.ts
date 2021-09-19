import { validateAdventurer } from 'utils/validations/regex'

describe('Structure line that define an adventurer: T - name - x - x - orientation - movements', () => {
  it('should return true for the structure: A - Nathan - 5 - 4 - S - AGD', () => {
    const adventurerStructure = 'A - Nathan - 5 - 4 - S - AGD'
    const isAdventurerValid = validateAdventurer(adventurerStructure)

    expect(isAdventurerValid).toBe(true)
  })

  it('should return false for the structure: A - Nathan - 5 - 4 - S - ', () => {
    const adventurerStructure = 'A - Nathan - 5 - 4 - S - '
    const isAdventurerValid = validateAdventurer(adventurerStructure)

    expect(isAdventurerValid).toBe(false)
  })

  it('should return false for the structure: A - Nathan - 5 - 4 - T - AGD', () => {
    const adventurerStructure = 'A - Nathan - 5 - 4 - T - AGD'
    const isAdventurerValid = validateAdventurer(adventurerStructure)

    expect(isAdventurerValid).toBe(false)
  })

  it('should return false for the structure: A - Nathan - 5 - 4 - S - BBA', () => {
    const adventurerStructure = 'A - Nathan - 5 - 4 - S - BBA'
    const isAdventurerValid = validateAdventurer(adventurerStructure)

    expect(isAdventurerValid).toBe(false)
  })

  it('should return false for the structure: A - Nathan - 5 - 4 - S - ', () => {
    const adventurerStructure = 'A - Nathan - 5 - 4 - S -'
    const isAdventurerValid = validateAdventurer(adventurerStructure)

    expect(isAdventurerValid).toBe(false)
  })
})
