import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { Post } from './types'

const postDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostData(): Post[] {
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

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  } as Post
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}