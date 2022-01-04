import React, { useEffect, useRef } from "react"
import { Layout } from "../../components/layout/Layout"
import { graphql, Link } from "gatsby"
import { PostProps } from "./Post.types"
import "./Post.styles.css"
import { PostTitle } from "../../components/postTitle/PostTitle"
import url from "url"
import { Meta } from "../../components/Meta/Meta"
import { MetaTypes } from "../../components/Meta/Meta.types"
import { parseISO } from "date-fns"
import { Helmet } from "react-helmet"
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../../icons"

const Post = ({ data: { markdownRemark: post, site }, location: { pathname } }: PostProps) => {
  const mailerLite = useRef();
  const postUrl = url.resolve(site.siteMetadata.siteUrl, pathname)

  return (
    <>
      <Meta type={MetaTypes.ARTICLE} url={pathname}
            postOptions={{
              title: post.frontmatter.title,
              tags: post.fields.tagSlugs.map(t => t.label),
              imageUrl: post.frontmatter.image?.publicURL,
              description: post.excerpt,
              publishedAt: post.frontmatter.date
            }}/>
      <Layout className='lg:w-full'>
        {/* <div className='rounded-lg bg-orange-500 w-full p-4 text-white flex justify-between items-center mb-6 lg:text-lg font-bold lg:flex-row flex-col'>
          Cześć, stworzyłem newsletter by móc dać ci jeszcze więcej wartości w 2021
          <a href='https://news.fsgeek.pl/'>
            <button className='text-orange-800 bg-white p-2 rounded-lg mt-2 lg:mt-0'>
              Chcę dołączyć do newslettera
            </button>
          </a>
        </div> */}
        <PostTitle
          className='mb-4'
          title={post.frontmatter.title}
          date={parseISO(post.frontmatter.date)}
          readingTime={post.timeToRead}
          wordCount={post.wordCount.words}
          postUrl={postUrl}
        />
        <div className='w-full flex flex-col lg:flex-row justify-between'>
          <div
            className='post w-full lg:w-3/4 flex lg:flex-col flex-col-reverse'
          >
            {/* <div className='w-full mb-8 bg-teal-200 p-4 rounded-lg'>
              Cześć. Cieszę się, że czytasz mój post. Jeśli podoba ci się to co piszę i chcesz otrzymywać informacje o
              nowych postach to  <a href='https://news.fsgeek.pl/'> dołącz do mojego newslettera </a>.

              <br/><br/>
              Jeśli zauważysz, że jakieś treści się zdezaktualizowały, a jesteś nimi zainteresowany to <a href='mailto:kontakt@fsgeek.pl'>napisz do mnie na kontakt@fsgeek.pl</a>. Zależy mi na
              tym aby tworzyć dla ciebie treści o największej jakości.
              <br/>
              <div className='text-xl text-center w-full my-3'>Dziękuję za pomoc i dołączenie do newslettera - to daje siły do pisania kolejnych postów.</div>
            </div> */}

            <div className='post' dangerouslySetInnerHTML={{ __html: post.html }}/>

            <div className='post '>
             Jeśli podoba ci się to co tworzę to dołącz do newslettera WebDev News. Jeszcze więcej wiedzy i ciekawych artykułów, które pomogą ci w karierze. &nbsp;
              <a href='https://webdevnews.pl/'>
                WebDev News - newsletter tworzony przez programistę dla programistów </a>
            </div>
          </div>
          <div className="lg:w-1/5">

            <h3 className="text-lg mb-5">Dołącz do mnie w Social Media</h3>
            <a href="https://www.instagram.com/fsgeek/"
               target="_blank" title="Otwórz fanpage" rel="noreferrer">
              <div className="flex items-center mb-4">
                  <InstagramIcon size={20}/>
                  <span className="ml-3 ">Instagram</span>
              </div>
            </a>
            <a href="https://www.facebook.com/fsgeekk"
               target="_blank" title="Otwórz fanpage" rel="noreferrer">
              <div className="flex items-center mb-4">
                  <FacebookIcon size={20}/>
                  <span className="ml-3 ">Facebook</span>
              </div>
              
            </a>
            <a href="https://twitter.com/fsgeek_pl"
               target="_blank" title="Otwórz profil na Twitter" rel="noreferrer">
              <div className="flex items-center mb-4">
                  <TwitterIcon size={20}/>
                  <span className="ml-3 ">Twitter</span>
              </div>
            </a>
            
            <div className="ml-form-embed mt-10 w-full"
              data-account="2669557:d1b7k0h4n3"
              data-form="3393565:m9y0q9"
              ref={mailerLite}
              />
          </div>
        </div>
        <div className="py-4">
          {post.fields.tagSlugs && post.fields.tagSlugs.map(tag => {
            return (
              <Link to={tag.value} key={tag.value}>
              <span
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-1">#{tag.label}</span>
              </Link>
            )
          })}
        </div>
      </Layout>
    </>
  )
}

export default Post

export const postQuery = graphql`
  query BlogPostQuery($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        slug
        title
        date
        image {
          publicURL
        }
      }
      timeToRead
      wordCount {
        words
      }
      fields {
        tagSlugs {
          label
          value
        }
      }
      excerpt
    }
    site {
        siteMetadata {
          siteUrl
        }
      }
  }
`