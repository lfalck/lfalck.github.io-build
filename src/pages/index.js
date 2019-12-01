import React from 'react'
import Layout from '@components/Layout'
import SEO from '@components/seo'
import NameBoard from '@components/NameBoard'
// import IBuildSection from '@components/IBuildSection'
import IBlogSection from '@components/IBlogSection'
// import ITalkSection from '@components/ITalkSection'
// import TweetThreadsSection from '@components/TweetThreadsSection'
// import PodcastSection from '@components/PodcastSection'

const IndexPage = ({ data }) => (
  <Layout showHome={false}>
    <SEO
      title="Azure Developer"
      keywords={[`developer`, `azure`, `integration`, `.net`]}
    />
    <NameBoard />
    {/* <IBuildSection /> */}
    <IBlogSection />
    {/* <ITalkSection /> */}
    {/* <TweetThreadsSection /> */}
    {/* <PodcastSection /> */}
  </Layout>
)

export default IndexPage
