const FilterContactName = (props) => {
  const {handleNameFilterOnChange, nameFilter} = props

  return <div>filter shown with: <input value={nameFilter} onChange={handleNameFilterOnChange} /></div>
}

export default FilterContactName