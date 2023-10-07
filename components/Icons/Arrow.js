import * as React from "react"
const Arrow = (props) => (
    <svg
        width={24}
        height={24}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="icon icon-tabler icon-tabler-arrow-big-left"
        {...props}
    >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M20 15h-8v3.586a1 1 0 0 1-1.707.707l-6.586-6.586a1 1 0 0 1 0-1.414l6.586-6.586A1 1 0 0 1 12 5.414V9h8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" />
    </svg>
)
export default Arrow
