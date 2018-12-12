import React from 'react'

const Search = props => (
  <div className="form-group">
    <input
      type="search"
      placeholder="Search"
      className={ props.invalid ? "form-control is-invalid" : "form-control" }
      onChange={ props.handleSearch }
      value={ props.term }
    />
  </div>
)

export default Search
