import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props)

    const { query } = props
    this.state = { query }
  }

  handleQueryInput(event) {
    this.setState({ query: event.target.value })
  }

  render() {
    const { query } = this.state

    return (
      <div className='d-flex flex-column'>
        <div className='input-group mb-3'>
          <input type='search' className='form-control' value={query} onChange={(event) => this.handleQueryInput(event)}/>
          <div className='input-group-append'>
            <button type='button' className='btn btn-sm btn-danger' onClick={() => this.props.search(query)}><i className='fas fa-search'/></button>
          </div>
        </div>
      </div>
    )
  }
}

export default Search
