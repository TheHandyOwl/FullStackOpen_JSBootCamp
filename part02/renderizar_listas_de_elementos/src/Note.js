export const Note = (props) => {
    //console.log("Note:", note)
    const { categories = [], content, date } = props
    //console.table(props)

    return (
        <div>
            <p>{content}</p>
            <small><time>{date}</time></small>
            <br />
            { categories.map( category => <small key={category}>{category}</small> ) }
        </div>
    )
}