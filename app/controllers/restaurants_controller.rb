class RestaurantsController < ApplicationController
  def create
    restaurant = Restaurant.find_or_create_by(place_id: params[:place_id])
    current_user.restaurants << restaurant
    redirect_to root_path
  end
end
