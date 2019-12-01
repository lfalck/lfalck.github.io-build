module.exports = {
  siteMetadata: {
    title: `.NET Developer`,
    description: `Ludvig Falck is a Freelance .NET developer working with Microsoft Azure, Systems Integration, Dynamics 365 (CRM) and much more.`,
    author: `@ludvigfalck`,
    fullName: `Ludvig Falck`,
    twitterHandle: `https://twitter.com/ludvigfalck`,
    githubHandle: `https://github.com/lfalck`,
    stackOverflowHandle: `https://stackoverflow.com/story/`,
    devToHandle: `https://dev.to`,
    mediumHandle: `https://medium.com`,
    linkedInHandle: `https://www.linkedin.com/in/ludvigfalck/`,
    siteUrl: `https://lfalck.se/`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`
          }]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog/`,
      },
    },
    `gatsby-transformer-javascript-frontmatter`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `portfolio`,
        short_name: `portfolio`,
        start_url: `/`,
        background_color: `#5badf0`,
        theme_color: `#5badf0`,
        display: `minimal-ui`,
        icon: `src/images/man.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-113793655-1',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
  ],
}
