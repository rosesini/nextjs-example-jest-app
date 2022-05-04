import { render, screen } from '@testing-library/react'
import { Post } from '@/lib/types'
import Home from '@/pages/index'

jest.mock('../lib/posts', () => {
  return {
    getSortedPostData: () => []
  }
})

describe('Home', () => {  
  const mockPostsData: Post[] = [
    {
      id: '1',
      title: 'Server-side rendering vs Static site generation',
      date: '2022-01-01',
      contentHtml: 'Post Content'
    }
  ]

  it('renders site title', () => {
    render(<Home postsData={[]} />)

    expect(screen.getByTestId('home__profile-name').textContent).toBe('RagedMist')
  })

  it('renders posts data', () => {
    render(<Home postsData={mockPostsData} />)

    expect(screen.getAllByTestId('post-item').length).toBeGreaterThan(0)

    expect(screen.getAllByTestId('post-item-title')[0].textContent).toBe(mockPostsData[0].title)
    expect(screen.getAllByTestId('post-item-title')[0].getAttribute('href')).toBe('/posts/1')

    expect(screen.getAllByTestId('post-item-date')[0].textContent).toBe('January 1, 2022')
  })

})
