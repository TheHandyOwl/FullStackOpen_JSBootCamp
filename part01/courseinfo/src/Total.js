const Total = ( { parts } ) => <p>Number of exercises { parts.map( part => part.exercises).reduce( (accumulator, currentValue) => accumulator + currentValue ) }</p>

/*
const Total = (props) => {
    return (
        <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    )
}
*/

export default Total;