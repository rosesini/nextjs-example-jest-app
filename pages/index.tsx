import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { Post } from '@/lib/types'
import { getSortedPostData } from '../lib/posts'
import Layout, { siteTitle } from '@/components/layout'
import Date from '@/components/date'
import utilStyles from '@/styles/utils.module.css'

type Props = {
  postsData: Post[]
}

export default function Home({ postsData }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        
        <ul className={utilStyles.list}>
          {postsData.map(({ id, date, title}) => (
            <li data-testid="post-item" className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a data-testid="post-item-title">{title}</a>
              </Link>
              <br />
              <small data-testid="post-item-date" className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postsData = getSortedPostData()
  return {
    props: {
      postsData
    }
  }
}