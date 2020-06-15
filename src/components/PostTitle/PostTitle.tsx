import React from 'react'
import { PostTitleProps } from "./PostTitle.types"
import clsx from 'clsx'
import './PostTitle.styles.css'

export const PostTitle = ({title, className, date, readingTime, wordCount}: PostTitleProps) => {


  return (
    <div className={clsx(className)}>
      <h1 className='title border-b-2 pb-2'>{title}</h1>
      <div className='flex flex-row mt-1'>
        <div className='mr-4'>Czas czytania: {readingTime}</div>
        <div className='mr-4'>Liczba słów: {wordCount}</div>
        <div>Data: </div>
        <div className='ml-auto'> SOCIAL </div>
      </div>
    </div>
  )
}