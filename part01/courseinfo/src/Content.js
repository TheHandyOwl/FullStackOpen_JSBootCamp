const Part = ( { part, exercises } ) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )
}
const Content = ( { part1, part2, part3 } ) => {
    return (
        <>
            <Part part={part1.name} exercises={part1.exercises} />
            <Part part={part2.name} exercises={part2.exercises} />
            <Part part={part3.name} exercises={part3.exercises} />
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