import { addAdventurer } from 'utils/helpers/map'

describe('add adventurer on a map', () => {
  const map = new Array(5).fill(null).map((_, x: number) =>
    new Array(6).fill(null).map((__, y: number) => ({
      type: 'plain',
      symbol: '*',
      isAdventurer: false,
      x: x as number,
      y: y as number,
    })),
  )

  it('should add adventurers on a map', () => {
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
    const result = addAdventurer(map, adventurers)

    expect(result[3][2].id).toBe('1')
    expect(result[3][2].name).toBe('nathan')
    expect(result[3][2].symbol).toBe(`A(nathan)`)
    expect(result[3][2].movements).toBe(`AG`)
    expect(result[3][2].orientation).toBe(`S`)
    expect(result[3][2].treasureRecovered).toBe(0)
    expect(result[3][2].type).toBe('adventurer')
    expect(result[3][2].priority).toBe(1)
  })
})
