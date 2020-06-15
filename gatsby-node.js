const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark  {
        edges {
          node {
            id
            frontmatter {
              slug
            } 
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  // Create blog post pages.
  const posts = result.data?.allMarkdownRemark?.edges ?? []
  // you'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
    createPage({
      path: `post/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/Post/Post.tsx`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}


const formatTag = (name) => {
  return name.toLowerCase().replace(' ', '-');
}


exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (
    node.internal.type === `MarkdownRemark` &&
    typeof node.slug === `undefined`
  ) {
    createNodeField({
      node,
      name: `slug`,
      value: `post/${node.frontmatter.slug}`
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => ({
          label: formatTag(tag),
          value: `/tags/${formatTag(tag)}/`
        })
      )
      createNodeField({ node, name: `tagSlugs`, value: tagSlugs })
    }
  }
}