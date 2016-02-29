class SiteController < ApplicationController
  def index
    @active_restaurants = current_user.restaurants.where(users_restaurants: {tried: false}) if current_user
    @tried_restaurants = current_user.restaurants.where(users_restaurants: {tried: true}) if current_user
    @key = ENV["GOOGLE_API_KEY"]
  end
end
