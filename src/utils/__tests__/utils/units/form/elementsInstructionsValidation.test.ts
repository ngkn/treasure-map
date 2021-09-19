import { elementsInstructionsValidation } from 'utils/helpers/form'

describe('Elements Instructions', () => {
  const instructionsValid = ['M - 2 - 2', 'T - 2 - 3 - 1', 'A - Nathan - 4 - 3 - S - A']
  const multipleMapLineCreation = ['C - 6 - 4', 'M - 2 - 2', 'T - 2 - 3 - 1', 'A - Nathan - 4 - 3 - S - A']
  const instructionsWithGreaterNumbers = ['M - 9 - 2', 'T - 2 - 3 - 1', 'A - Nathan - 4 - 3 - S - A']
  const mapLineInstruction = 'C - 6 - 4'

  it('should has all properties: mountains, treasures, adventurers, is valid', () => {
    const result = elementsInstructionsValidation(instructionsValid, mapLineInstruction)

    expect(typeof result === 'object').toBe(true)
    expect(Object.prototype.hasOwnProperty.call(result, 'mountains')).toBe(true)
    expect(Object.prototype.hasOwnProperty.call(result, 'treasures')).toBe(true)
    expect(Object.prototype.hasOwnProperty.call(result, 'adventurers')).toBe(true)
    expect(Object.prototype.hasOwnProperty.call(result, 'isValid')).toBe(true)
  })

  it('should has items in each property', () => {
    const result = elementsInstructionsValidation(instructionsValid, mapLineInstruction)

    expect(result.mountains.length).toBeGreaterThanOrEqual(1)
    expect(result.treasures.length).toBeGreaterThanOrEqual(1)
    expect(result.adventurers.length).toBeGreaterThanOrEqual(1)
    expect(result.isValid).toBe(true)
  })

  it('should return false when there are two map line creation', () => {
    const result = elementsInstructionsValidation(multipleMapLineCreation, mapLineInstruction)

    expect(result.isValid).toBe(false)
  })

  it('should return false when an instructions number are greater than the map creation', () => {
    const result = elementsInstructionsValidation(instructionsWithGreaterNumbers, mapLineInstruction)

    expect(result.isValid).toBe(false)
  })
})
