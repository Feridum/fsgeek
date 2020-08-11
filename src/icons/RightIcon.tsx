import React from "react"
import { IconProps } from "./icons.types"


export const RightIcon = ({ size, className }: IconProps) => {

  return (
    <div className={className}>
    <svg className="bi bi-arrow-right-short" width={size} height={size} viewBox="0 0 16 16" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd"
            d="M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z"/>
      <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z"/>
    </svg>
    </div>
  )
}