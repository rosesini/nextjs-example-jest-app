import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Layout, { siteTitle } from '@/components/layout'
import Date from '@/components/date'
import { Post } from '@/lib/types'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '@/styles/utils.module.css'

type Props = {
  postData: Post
}

export default function PostPage({ postData }: Props) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <article>
        <h1 data-testid="post-title" className={utilStyles.headingXl}>{postData.title}</h1>
        <div data-testid="post-date" className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div data-testid="post-content" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const postData = await getPostData(params?.id as string)
  return {
    props: {
      postData
    }
  }
}