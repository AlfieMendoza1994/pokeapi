import React from 'react'

const pokemonTypes = ({ types }) => {
  const sortedTypes = types && types.sort((type1, type2) => type1['slot'] - type2['slot']).map((typeData, index) => <span key={`type-${index}`}>{typeData['type']['name']}</span>)

  return sortedTypes
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
    const { selectedPokemon, pokemon, clearSelectedPokemon } = this.props
    const { loading, details } = this.state

    if (!selectedPokemon) {
      return null
    }

    return (
      <div className='border-right border-secondary w-75'>
        <div className='d-flex flex-column m-5'>
          <div className='d-flex justify-content-between'>
            <div className='pokemon-detail__header'>
              <h1 className='text-capitalize'>{pokemon.name}</h1>
              {loading && <span>FETCHING DATA...</span>}
              {!loading && pokemonTypes(details)}
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
