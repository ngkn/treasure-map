import { FormReadFile } from 'components'
import { shallow, mount, render } from 'enzyme'

import { findByAttr } from 'setupTests'
// Mount -> renders a component to its extreme leaf nodes
// shallow -> renders just the component and not its children.
// snapshot -> Render properly
// spy (jest.fn()) ->

const config = (props: any) => {
  const formComponent = shallow(<FormReadFile {...props} />)

  return formComponent
}

describe('Form read file', () => {
  let formComponent: any

  beforeEach(() => {
    formComponent = config({})
  })

  it('should render form without errors', () => {
    const wrapper = findByAttr(formComponent, 'formEntryFile')
    expect(wrapper.length).toBe(1)
  })
})
