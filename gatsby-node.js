const path = require("path")

const postsPerPage = 8;

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
      {
        posts: allMarkdownRemark  {
          edges {
            node {
              id
              frontmatter {
                slug
                date
                url
              } 
            }
          }
        }
       tags: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  // Create blog post pages.
  const posts = result.data?.posts?.edges ?? []
  // you'll call `createPage` for each result

  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    const currentPage = i + 1;
    const previousPage = currentPage === 2 ? '/post' : `/post/page/${i-1}/`

    createPage({
      path: i === 0 ? `/post` : `/post/page/${i + 1}/`,
      component: path.resolve(`./src/templates/MainList/MainList.tsx`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        nextPage: currentPage === numPages ? null : `/post/page/${currentPage+1}/`,
        previousPage: i === 0 ? null : previousPage,
      },
    });

    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}/`,
      component: path.resolve(`./src/templates/MainList/MainList.tsx`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        nextPage: currentPage === numPages ? null : `/page/${currentPage+1}/`,
        previousPage: i === 0 ? null : previousPage,
      },
    });
  });


  posts.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.url ? node.frontmatter.url : `/post/${node.frontmatter.slug}/`,
      component: path.resolve(`./src/templates/Post/Post.tsx`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id, dateCreated: node.frontmatter.date, },
    })
  })

  const tags = result.data.tags.group
  // Make tag pages
  tags.forEach(tag => {

    const numPages = Math.ceil(tag.totalCount / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      const currentPage = i + 1;
      const basicPath = `/tags/${formatTag(tag.fieldValue)}/`;
      const previousPage = currentPage === 2 ? basicPath : `${basicPath}/page/${i-1}/`

      createPage({
        path: i === 0 ? basicPath : `${basicPath}page/${i + 1}/`,
        component: path.resolve(`./src/templates/Tag/Tag.tsx`),
        context: {
          tag: formatTag(tag.fieldValue),
          limit: postsPerPage,
          skip: i * postsPerPage,
          nextPage: currentPage === numPages ? null : `${basicPath}page/${currentPage+1}/`,
          previousPage: i === 0 ? null : previousPage,
        },
      });
    });
  })
}


const formatTag = (name) => {
  return name.toLowerCase().split(" ").join('-').replace('?', '');
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
      value: `post/${node.frontmatter.slug}/`
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