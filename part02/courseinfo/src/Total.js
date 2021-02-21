//const Total = ( {parts} ) => <p>Total of { parts.map( part => part.exercises).reduce( (accumulator, currentValue) => accumulator + currentValue ) } exercises</p>
const Total = ( {parts} ) => <p>Total of { parts.reduce( (accumulator, currentValue) => (accumulator + currentValue.exercises), 0 ) } exercises</p>

export default Total;