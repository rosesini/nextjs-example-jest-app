import { render, screen } from '@testing-library/react'
import { Post } from '@/lib/types'
import PostPage from '@/pages/posts/[id]'

jest.mock('../lib/posts', () => {
  return {
    getAllPostIds: () => [],
    getPostData: () => {}
  }
})

describe('Post Page', () => {
  const mockPostData: Post = {
    id: '1',
    title: 'Nextjs - React SSR Framework',
    date: '2022-01-01',
    contentHtml: '<p><strong>Post Content</strong><br />React ...<p>'
  }

  it('renders post content', () => {
    render(<PostPage postData={mockPostData} />)

    expect(screen.getByTestId('post-title').textContent).toBe(mockPostData.title)
    expect(screen.getByTestId('post-date').textContent).toBe('January 1, 2022')
    expect(screen.getByTestId('post-content').textContent).toBe('Post ContentReact ...')
  })

})