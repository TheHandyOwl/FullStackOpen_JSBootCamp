const Part = ( { part, exercises } ) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )
}
const Content = ( { part1, part2, part3, exercises1, exercises2, exercises3 } ) => {
    return (
        <>
            <Part part={part1} exercises={exercises1} />
            <Part part={part2} exercises={exercises2} />
            <Part part={part3} exercises={exercises3} />
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