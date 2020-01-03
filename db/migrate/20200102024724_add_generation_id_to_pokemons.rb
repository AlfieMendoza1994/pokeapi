class AddGenerationIdToPokemons < ActiveRecord::Migration[6.0]
  def change
    add_reference :pokemons, :generation, null: false, foreign_key: true
  end
end
