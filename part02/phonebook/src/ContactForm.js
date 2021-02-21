const ContactForm = (props) => {
    const {newName, newNumber, handleClickOnSubmit, handleNameOnChange, handleNumberOnChange, handleNumberKeyPress} = props

    return (
        <div>
            <h2>Add new contact</h2>
            <form onSubmit={handleClickOnSubmit}>
                <div>name: <input value={newName} onChange={handleNameOnChange} /></div>
                <div>number: <input value={newNumber} onChange={handleNumberOnChange} onKeyPress={handleNumberKeyPress} /></div>
                <div>
                    <button>add</button>
                </div>
            </form>
        </div>
    )
}

export default ContactForm