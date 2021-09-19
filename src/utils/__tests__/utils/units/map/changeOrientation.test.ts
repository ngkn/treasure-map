import { changeOrientation } from 'utils/helpers/map/movements'

describe('change adventurer orientation', () => {
  it('should return another orientation depend on adventurer movement & direction', () => {
    const movement = 'D'
    const orientation = 'N'

    const result = changeOrientation(movement, orientation)

    expect(result).toBe('E')
  })
})
