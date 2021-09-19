import { validateMountain } from 'utils/validations/regex'

describe('Structure line that define a mountain: : M - x - x', () => {
  it('should return true for the structure: M - 2 - 2', () => {
    const mountainStructure = 'M - 2 - 2'
    const isMountainValid = validateMountain(mountainStructure)

    expect(isMountainValid).toBe(true)
  })

  it('should return false for the structure: M - 2 - ', () => {
    const mountainStructure = 'M - 2 - '
    const isMountainValid = validateMountain(mountainStructure)

    expect(isMountainValid).toBe(false)
  })

  it('should return false for the structure: C - 2 - 2', () => {
    const mountainStructure = 'C - 2 - 2'
    const isMountainValid = validateMountain(mountainStructure)

    expect(isMountainValid).toBe(false)
  })

  it('should return false for the structure: M  2  2', () => {
    const mountainStructure = 'M  2  2'
    const isMountainValid = validateMountain(mountainStructure)

    expect(isMountainValid).toBe(false)
  })

  it('should return false for the structure: C / 2 / 2', () => {
    const mountainStructure = 'C / 2 / 2'
    const isMountainValid = validateMountain(mountainStructure)

    expect(isMountainValid).toBe(false)
  })
})
