class SiteController < ApplicationController
  def index
    @restaurants = current_user.restaurants
    @key = ENV["GOOGLE_API_KEY"]
  end
end
