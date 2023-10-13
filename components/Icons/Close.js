
const CloseIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="icon icon-tabler icon-tabler-square-x"
        {...props}
    >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zM9 9l6 6m0-6-6 6" />
    </svg>
)
export default CloseIcon
