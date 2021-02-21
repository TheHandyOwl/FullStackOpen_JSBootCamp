import Number from './Number'

const Numbers = ({filteredPersons}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {
        (
          (filteredPersons === undefined) || (filteredPersons === null) || (filteredPersons === false) || (filteredPersons.length === 0)
        ) ? <p>Your phonebook is empty</p>
          : (<ul>
              { filteredPersons.map(person => <Number key={person.name} person={person} />) }
            </ul>)
      }
    </div>
  )
}

export default Numbers