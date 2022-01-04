import { IGatsbyImageData } from "gatsby-plugin-image"

export type PostList = {
  id: string;
  excerpt: string,
  frontmatter: {
    slug: string,
    url?: string,
    title: string,
    image: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      }
    }
  }
  fields: {
    tagSlugs: { label: string, value: string }[]
  }
}

export type Post = {
  id: string;
  html: string,
  frontmatter: {
    slug: string,
    title: string
    date: string
    image?: {
      publicURL: string
    }
  }
  timeToRead: number,
  wordCount: {
    words: number
  }
  fields: {
    tagSlugs: {
      label: string
      value: string
    }[]
  }
  excerpt: string
}