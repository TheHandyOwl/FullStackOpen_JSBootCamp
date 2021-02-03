const Part = ( { part } ) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}
const Content = ( { parts } ) => {
    return (
        <>
            { parts.map( part => <Part part={part} /> ) }
        </>
    )
}

/*
const Content = (props) => {
    return (
        <>
            <p>
                {props.part1} {props.exercises1}
            </p>
            <p>
                {props.part2} {props.exercises2}
            </p>
            <p>
                {props.part3} {props.exercises3}
            </p>
        </>
    )
}
*/

export default Content;