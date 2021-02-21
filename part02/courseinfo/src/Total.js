const Total = ( {parts} ) => <p>Total of { parts.map( part => part.exercises).reduce( (accumulator, currentValue) => accumulator + currentValue ) } exercises</p>

export default Total;