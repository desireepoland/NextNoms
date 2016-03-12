class SiteController < ApplicationController
  def index
    if logged_in?
      @restaurants = current_user.restaurants_for(cookies[:filter]) if current_user
      @key = ENV["GOOGLE_API_KEY"]
    else
      render :welcome, layout: "guest"
    end
  end
end
