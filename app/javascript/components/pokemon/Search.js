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
        <form onSubmit={(event) => this.props.search(event, query)}>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'><i className='fas fa-search'/></span>
            </div>
            <input type='search' className='form-control' value={query} onChange={(event) => this.handleQueryInput(event)} placeholder='Search...'/>
          </div>
        </form>
      </div>
    )
  }
}

export default Search
