import { moveForward } from 'utils/helpers/map/movements'

describe('move forward adventurer through the map', () => {
  const lengthMap = 6
  const widthMap = 5
  const adventurerOne = {
    id: '1',
    name: 'nathan',
    horizontally: 2,
    vertically: 3,
    orientation: 'S',
    movements: 'AG',
    treasureRecovered: 0,
    type: 'adventurer',
    total: 2,
    priority: 1,
  }

  const adventurerTwo = {
    id: '1',
    name: 'nathan',
    horizontally: 7,
    vertically: 3,
    orientation: 'S',
    movements: 'AG',
    treasureRecovered: 0,
    type: 'adventurer',
    total: 2,
    priority: 1,
  }

  it('should move forward an adventurer depend on his direction', () => {
    const result = moveForward(adventurerOne, widthMap, lengthMap)

    expect(result.horizontally).toBe(3)
  })

  it('should not move forward an adventurer Who is located at the end of the map', () => {
    const result = moveForward(adventurerTwo, widthMap, lengthMap)

    expect(result.horizontally).toBe(7)
  })
})
