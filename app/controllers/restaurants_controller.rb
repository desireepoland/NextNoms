class RestaurantsController < ApplicationController
  def create
    restaurant = Restaurant.find_or_create_by(place_id: params[:place_id])
    current_user.restaurants << restaurant unless current_user.restaurants.include?(restaurant)
    redirect_to root_path
  end

  def update
    ur = UsersRestaurant.find(params[:id])
    ur.toggle!(:tried)
    redirect_to root_path
  end

  def destroy
    UsersRestaurant.find(params[:id]).destroy
    redirect_to root_path
  end
end
