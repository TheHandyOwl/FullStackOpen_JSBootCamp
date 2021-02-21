import Part from './Part'

const Parts = ( {parts} ) => parts.map( part => <Part key={part.id} part={part} /> )

export default Parts;