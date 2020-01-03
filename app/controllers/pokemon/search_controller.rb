class Pokemon::SearchController < ApplicationController
  def index
    render json: { pokemons: Pokemon.where('name LIKE ?', "%#{params[:q]}%").order(:name) }, status: :ok
  end
end
