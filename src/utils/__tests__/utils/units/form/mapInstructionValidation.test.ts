import { mapInstructionValidation } from 'utils/helpers/form'

describe('Map line creation instruction', () => {
  it("should validate the map creation by returning it's width and length ", () => {
    const mapInstruction = 'C - 3 - 4'
    const instructionsTotal = 6

    const result = mapInstructionValidation(mapInstruction, instructionsTotal)

    expect(typeof result === 'object').toBe(true)
    expect(result.width).toEqual(3)
    expect(result.length).toEqual(4)
  })

  it('should return an empty object when instructionsTotal is greater than the multiplication of numbers instructions', () => {
    const mapInstruction = 'C - 3 - 4'
    const instructionsTotal = 13

    const result = mapInstructionValidation(mapInstruction, instructionsTotal)

    expect(Object.entries(result).length).toEqual(0)
    expect(result.width).toBe(undefined)
    expect(result.length).toEqual(undefined)
  })

  it("should return an empty object if it's not a rectangle", () => {
    const mapInstruction = 'C - 4 - 4'
    const instructionsTotal = 6

    const result = mapInstructionValidation(mapInstruction, instructionsTotal)

    expect(Object.entries(result).length).toEqual(0)
    expect(result.width).toBe(undefined)
    expect(result.length).toEqual(undefined)
  })
})
