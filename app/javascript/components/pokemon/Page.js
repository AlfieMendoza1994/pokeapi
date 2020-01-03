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
    this.state = { query, pokemons, hasSearched, selectedPokemon: '', loading: false }
  }

  handleSearch(event, searchQuery) {
    event.preventDefault()
    this.setState({ loading: true }, () => {
      fetch(`/pokemon/search?q=${searchQuery}`)
        .then(response => response.json())
        .then(({ pokemons }) => this.setState({ pokemons, hasSearched: true }))
        .catch((error) => console.log(error))
        .then(() => this.setState({ loading: false }))
    })
  }

  handleViewPokemon(event, selectedPokemon) {
    event.preventDefault()
    this.setState({ selectedPokemon })
  }

  handleClearSelectedPokemon() {
    this.setState({ selectedPokemon: '' })
  }

  render () {
    const { pokemons, query, hasSearched, selectedPokemon, loading } = this.state

    return (
      <div className='d-flex vh-100'>
        <Detail selectedPokemon={selectedPokemon} clearSelectedPokemon={this.handleClearSelectedPokemon.bind(this)}/>
        <div className='d-flex flex-column m-3 w-25'>
          <Search query={query} search={this.handleSearch.bind(this)}/>
          <List loading={loading} pokemons={pokemons} hasSearched={hasSearched} selectedPokemon={selectedPokemon} viewPokemon={this.handleViewPokemon.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default Page
