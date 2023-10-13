
const Star = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="icon icon-tabler icon-tabler-north-star"
        {...props}
    >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M3 12h18M12 21V3M7.5 7.5l9 9M7.5 16.5l9-9" />
    </svg>
)
export default Star
