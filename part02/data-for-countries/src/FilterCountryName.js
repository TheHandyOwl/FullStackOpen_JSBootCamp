const FilterCountryName = (props) => {
  const {handleNameFilterOnChange, nameFilter} = props

  return <div>Name's filter: <input value={nameFilter} onChange={handleNameFilterOnChange} /></div>
}

export default FilterCountryName