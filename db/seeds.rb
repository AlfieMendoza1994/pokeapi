pokemon_species = []

(1..7).to_a.each do |iteration|
  data = JSON.load(open("https://pokeapi.co/api/v2/generation/#{iteration}"))
  puts "Saving Data for #{data['main_region']['name']}"
  generation = Generation.create(region: data['main_region']['name'])

  data['pokemon_species'].each do |pokemon|
    name, pokemon_url = pokemon.values_at('name', 'url')
    resource_id = pokemon_url.match(/\/(\d+)\/$/)[1]
    pokemon_species.push(
      Pokemon.new(
        name: name,
        resource_id: resource_id,
        generation_id: generation.id
      )
    )
  end
end

Pokemon.import pokemon_species
