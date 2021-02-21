export const Post = (props) => {
    const { title = "", body = "" } = props

    return (
        <div>
            <h2>{title}</h2>
            <p>{body}</p>
        </div>
    )
}