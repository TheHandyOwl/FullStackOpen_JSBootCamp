const Number = ({handleClickDeleteContact, person}) => <li>{person.name}: {person.number} <button onClick={() => handleClickDeleteContact(person)}>Delete</button></li>

export default Number