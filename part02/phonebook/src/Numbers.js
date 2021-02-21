import Number from './Number'

const Numbers = ({persons}) => {
  return (
    <ul>
      { persons.map(person => <Number key={person.name} person={person} />) }
    </ul>
  )
}

export default Numbers