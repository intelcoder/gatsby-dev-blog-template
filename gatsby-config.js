const wrapESMPlugin = (name) =>
  function wrapESM(opts) {
    return async (...args) => {
      const mod = await import(name);
      const plugin = mod.default(opts);
      return plugin(...args);
    };
  };
module.exports = {
  siteMetadata: {
    title: `Dev Blog`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ],
        mdxOptions: {
          remarkPlugins: [
            // Add GitHub Flavored Markdown (GFM) support
            wrapESMPlugin(`remark-gfm`),
            wrapESMPlugin(`remark-cite`),
            // To pass options, use a 2-element array with the
            // configuration in an object in the second element
            [wrapESMPlugin(`remark-external-links`), { target: false }],
          ],
          rehypePlugins: [
            // Generate heading ids for rehype-autolink-headings
            wrapESMPlugin(`rehype-slug`),
            // To pass options, use a 2-element array with the
            // configuration in an object in the second element
            [wrapESMPlugin(`rehype-autolink-headings`), { behavior: `wrap` }],
          ],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": "src",
          "@components": "src/components",
          "@layouts": "src/layouts",
          "@pages": "src/pages",
          "@templates": "src/templates",
        },
        extensions: ["js"],
      },
    },
  ],
};
