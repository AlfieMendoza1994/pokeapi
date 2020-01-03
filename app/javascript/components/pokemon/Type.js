import React from 'react'

class Type extends React.Component {
  render() {
    return (
      <span className={`pokemon-type pokemon-type--${this.props.text}`}>{this.props.text}</span>
    )
  }
}

export default Type
