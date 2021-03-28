import React from 'react'
import { PostTitleProps } from "./PostTitle.types"
import clsx from 'clsx'
import './PostTitle.styles.css'
import { format } from 'date-fns'
import { FacebookIcon, TwitterIcon } from "../../icons"

export const PostTitle = ({title, className, date, readingTime, wordCount, postUrl}: PostTitleProps) => {

  return (
    <div className={clsx(className)}>
      <div className="border-b-2 pb-2 flex-row justify-between flex items-end">
        <h1 className='title inline'>{title}</h1>
        <h2 className='text-sm inline'>Aleksander Patschek</h2>
      </div>
      <div className='flex flex-row mt-1 flex-wrap'>
        <div className='w-full md:w-auto mr-4'>Czas czytania: {readingTime} min</div>
        <div className='w-full md:w-auto mr-4'>Liczba słów: {wordCount}</div>
        <div className='w-full md:w-auto'>Data: {format(date, 'dd-LL-yyyy')}</div>
        <div className='md:ml-auto flex flex-row'>
          Udostępnij:
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}&t=${title}`}
             target="_blank" title="Udostępnij na Facebook" className='ml-5' rel="noreferrer">
            <FacebookIcon size={20}/>
          </a>
          <a href={`https://twitter.com/share?url=${postUrl}`}
             target="_blank" title="Udostępnij na Twitter" rel="noreferrer">
            <TwitterIcon size={20} className='ml-3'/>
          </a>

        </div>
      </div>
    </div>
  )
}