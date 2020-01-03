import React from 'react'

class Loading extends React.Component {
  render() {
    const { loading } = this.props

    if (!loading) {
      return null
    }

    return (
      <div className='spinner-border text-danger' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    )
  }
}

export default Loading
