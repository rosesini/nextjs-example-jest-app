import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from './types'

const postDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostData() {
  const fileNames = fs.readdirSync(postDirectory)
  const allPostsData: Post[] = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postDirectory, fileName)
    const fullContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fullContents)

    return {
      id,
      ...matterResult.data
    } as Post
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}