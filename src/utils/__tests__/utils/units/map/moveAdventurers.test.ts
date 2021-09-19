import { moveAdventurers } from 'utils/helpers/map/movements'

describe('Move adventurers on map', () => {
  const widthMap = 6
  const lengthMap = 5
  const map = new Array(lengthMap).fill(null).map((_, x: number) =>
    new Array(widthMap).fill(null).map((__, y: number) => ({
      type: 'plain',
      symbol: '*',
      isAdventurer: false,
      x: x as number,
      y: y as number,
    })),
  )

  const adventurers = [
    {
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
    },
  ]

  const treasures = [
    {
      idTreasure: '1',
      name: 'nathan',
      horizontally: 2,
      vertically: 3,
      orientation: 'S',
      movements: 'AG',
      treasureRecovered: 0,
      type: 'adventurer',
      total: 2,
      priority: 1,
    },
  ]

  it('should return an array adventurer array with +1 in horizontally coord', () => {
    const result = moveAdventurers({ map, widthMap, lengthMap, adventurers, treasures })

    expect(result.adventurersCopy[0].horizontally).toBe(3)
  })

  it('should return an array adventurer with less movements', () => {
    const result = moveAdventurers({ map, widthMap, lengthMap, adventurers, treasures })

    expect(result.adventurersCopy[0].movements).toBe('')
  })

  it('should return an array adventurer with another orientation', () => {
    const result = moveAdventurers({ map, widthMap, lengthMap, adventurers, treasures })

    expect(result.adventurersCopy[0].orientation).toBe('E')
  })

  it('should return map array with new adventurer infos', () => {
    const result = moveAdventurers({ map, widthMap, lengthMap, adventurers, treasures })

    expect(result.mapCopy[3][3].isAdventurer).toBe(true)
  })
})
