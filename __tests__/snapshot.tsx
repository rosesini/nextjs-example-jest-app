import { render } from '@testing-library/react'
import Home from '@/pages/index'

jest.mock('../lib/posts', () => {
  return {
    getSortedPostData: () => []
  }
})

it('renders homepage unchanged', () => {
  const { container } = render(<Home postsData={[]} />)
  expect(container).toMatchSnapshot()
})
