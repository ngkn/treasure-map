import { addTreasure } from 'utils/helpers/map'

describe('add treasure on a map', () => {
  const map = new Array(5).fill(null).map((_, x: number) =>
    new Array(6).fill(null).map((__, y: number) => ({
      type: 'plain',
      symbol: '*',
      isAdventurer: false,
      x: x as number,
      y: y as number,
    })),
  )

  it('should add treasures on a map', () => {
    const treasures = [{ idTreasure: '1', horizontally: 2, vertically: 3, type: 'treasure', total: 2 }]
    const result = addTreasure(map, treasures)

    expect(result[3][2].idTreasure).toBe('1')
    expect(result[3][2].type).toBe('treasure')
    expect(result[3][2].symbol).toBe(`T(2)`)
    expect(result[3][2].total).toBe(2)
  })
})
