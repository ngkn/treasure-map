import { instructionsValidation } from 'utils/helpers/form'

describe('Check all instructions', () => {
  it('should return two fill objects: mapValid and elementsValid', () => {
    const instructionsValid = ['C - 6 - 4', 'M - 2 - 2', 'T - 2 - 3 - 2', 'A - Nathan - 4 - 3 - S - A']
    const result = instructionsValidation(instructionsValid)

    expect(result.mapValid.width).toBe(6)
    expect(result.mapValid.length).toBe(4)
    expect(result.elementsValid.mountains.length).toBeGreaterThanOrEqual(1)
    expect(result.elementsValid.treasures.length).toBeGreaterThanOrEqual(1)
    expect(result.elementsValid.adventurers.length).toBeGreaterThanOrEqual(1)
    expect(result.elementsValid.isValid).toBe(true)
  })

  it('should return empty mapValid object', () => {
    const instructionsWithoutMapInstruction = ['M - 4 - 2', 'T - 2 - 3 - 2', 'A - Nathan - 4 - 3 - S - A']
    const result = instructionsValidation(instructionsWithoutMapInstruction)

    expect(result.mapValid).toBe(undefined)
  })

  it('should return empty mapValid object', () => {
    const mapInstructionOnly = ['C - 6 - 2']
    const result = instructionsValidation(mapInstructionOnly)

    expect(result.mapValid.width).toBe(6)
    expect(result.mapValid.length).toBe(2)
    expect(result.elementsValid.isValid).toBe(true)
  })
})
