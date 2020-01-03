import React from 'react'
import Search from './Search'
import List from './List'
import Detail from './Detail'

class Page extends React.Component {
  static defaultProps = {
    query: '',
    pokemons: [],
    hasSearched: false
  }

  constructor(props) {
    super(props)

    const { query, pokemons, hasSearched } = props
    this.state = { query, pokemons, hasSearched, selectedPokemon: '' }
  }

  handleSearch(searchQuery) {
    fetch(`/pokemon/search?q=${searchQuery}`)
      .then(response => response.json())
      .then(({ pokemons }) => this.setState({ pokemons, hasSearched: true }))
      .catch((error) => console.log(error))
  }

  handleViewPokemon(event, selectedPokemon) {
    event.preventDefault()
    this.setState({ selectedPokemon })
  }

  handleClearSelectedPokemon() {
    this.setState({ selectedPokemon: '' })
  }

  render () {
    const { pokemons, query, hasSearched, selectedPokemon } = this.state
    const pokemon = pokemons.find((pokemon) => pokemon.resource_id === selectedPokemon) || {}

    return (
      <div className='d-flex vh-100'>
        <Detail selectedPokemon={selectedPokemon} pokemon={pokemon} clearSelectedPokemon={this.handleClearSelectedPokemon.bind(this)}/>
        <div className={`d-flex flex-column m-3 ${selectedPokemon ? 'w-25' : 'w-100'}`}>
          <Search query={query} search={this.handleSearch.bind(this)}/>
          <List pokemons={pokemons} hasSearched={hasSearched} selectedPokemon={selectedPokemon} viewPokemon={this.handleViewPokemon.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default Page
