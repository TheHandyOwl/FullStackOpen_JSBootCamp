export const Note = (props) => {
    const { note, handleToggleImportanceOf } = props
    const { categories = [], content, date, important } = note

    return (
        <li className="note">
            {content} <small><time>{date}</time></small>{ important ? <strong> - Important!</strong> : null}
            <br />
            { categories.map( category => <small key={category}>{category}</small> ) }
            <br />
            <button onClick={() => handleToggleImportanceOf(note)} >{ important ? "Remove important" : "It's important" }</button>
        </li>
    )
}