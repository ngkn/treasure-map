import { addMountain } from 'utils/helpers/map'

describe('add mountain on a map', () => {
  const map = new Array(5).fill(null).map((_, x: number) =>
    new Array(6).fill(null).map((__, y: number) => ({
      type: 'plain',
      symbol: '*',
      isAdventurer: false,
      x: x as number,
      y: y as number,
    })),
  )

  it('should add mountains on a map', () => {
    const mountains = [{ id: '1', horizontally: 2, vertically: 3, type: 'mountain' }]
    const result = addMountain(map, mountains)

    expect(result[3][2].type).toBe('mountain')
    expect(result[3][2].symbol).toBe('M')
  })
})
