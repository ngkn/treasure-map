import { instructionsToArray } from 'utils/helpers/form'

describe('instructions in string to an array', () => {
  it('should return an array where each line of text refers to an index', () => {
    const multipleLines = `Ceci est un texte
    contenant plusieurs lignes
    afin de passer un test`

    const multipleLinesArray = instructionsToArray(multipleLines)
    const multipleLinesArrayLength = multipleLinesArray.length

    expect(Array.isArray(multipleLinesArray)).toBe(true)
    expect(multipleLinesArrayLength).toEqual(3)
  })
})
