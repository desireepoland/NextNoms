class SiteController < ApplicationController
  def index
    if logged_in?
      @restaurants = current_user.restaurants_for(cookies[:filter])
      @key = ENV["GOOGLE_API_KEY"]
    else
      render :welcome, layout: "guest"
    end
  end
  def about
    if !logged_in?
      render :about, layout: "guest"
    end
  end
end
