import { stringToArray } from 'utils/helpers/form'

describe('Turns a string line into an array', () => {
  it('should return an array from the decomposed line by "-" and " "', () => {
    const oneLine = `Ceci - est - un - texte`

    const oneLineArray = stringToArray(oneLine)
    const oneLineArrayLength = oneLineArray.length

    expect(Array.isArray(oneLineArray)).toBe(true)
    expect(oneLineArrayLength).toEqual(4)
    expect(oneLineArray[0]).toBe('Ceci')
    expect(oneLineArray[1]).toBe('est')
    expect(oneLineArray[2]).toBe('un')
    expect(oneLineArray[3]).toBe('texte')
  })
})
