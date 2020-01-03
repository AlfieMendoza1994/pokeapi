import React from 'react'
import Loading from '../shared/Loading'
import Type from './Type'

const pokemonTypes = (loading, { types }) => {
  if (loading || !types) {
    return null
  }

  const sortedTypes = types.sort((type1, type2) => type1['slot'] - type2['slot'])
    .map((typeData, index) => {
      return <Type key={`type-${index}`} text={typeData['type']['name']}/>
    })
  return (
    <div className='mt-3'>
      {sortedTypes}
    </div>
  )
}

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { details: {} }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedPokemon !== this.props.selectedPokemon && this.props.selectedPokemon) {
      this.setState({ loading: true }, () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.selectedPokemon}`)
          .then(response => response.json())
          .then((res) => this.setState({ details: res }))
          .catch((error) => console.log(error))
          .then(() => this.setState({ loading: false }))
      })
    }
  }

  render() {
    const { selectedPokemon, clearSelectedPokemon } = this.props
    const { loading, details } = this.state

    if (!selectedPokemon) {
      return (
        <div className='border-right border-secondary w-75 d-flex justify-content-center align-items-center'>
          <h2 className='text-secondary'>Search Pokémon to Begin</h2>
        </div>
      )
      return null
    }

    return (
      <div className='pokemon-detail border-right border-secondary w-75'>
        <Loading loading={loading}/>
        <div className='d-flex flex-column m-3'>
          <div className='d-flex justify-content-between'>
            <div className='d-flex pokemon-detail__header'>
              <h2 className='text-capitalize'>{details['name']}</h2>
              {pokemonTypes(loading, details)}
            </div>
            <div className='pokemon-detail__close'>
              <button type='button' className='close' aria-label='Close' onClick={clearSelectedPokemon}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Detail
