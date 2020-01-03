import React from "react"
import Loading from '../shared/Loading'

const row = (pokemonSpecies, index, viewPokemon, selectedPokemon) => {
  const { name, resource_id: resourceId } = pokemonSpecies

  return (
    <a href='#' key={index} className={`text-capitalize list-group-item list-group-item-action ${selectedPokemon === resourceId ? 'active' : ''}`} onClick={(event) => viewPokemon(event, resourceId)}>{name}</a>
  )
}

class List extends React.Component {
  render () {
    const { pokemons, hasSearched, selectedPokemon, loading } = this.props

    if (loading) {
      return (
        <div className='pokemon-list'>
          <Loading loading={loading}/>
        </div>
      )
    } else if (pokemons.length == 0 && hasSearched) {
      return (
        <div className='d-flex flex-column'>
          <span>NO POKEMON FOUND</span>
        </div>
      );
    } else if (pokemons.length > 0 ) {
      return (
        <div className='d-flex flex-column overflow-auto'>
          <div className='list-group'>
            {this.props.pokemons.map((pokemon, index) => row(pokemon, index, this.props.viewPokemon, selectedPokemon))}
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default List
