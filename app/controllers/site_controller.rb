class SiteController < ApplicationController
  def index
    if logged_in?
      params[:page] ||= 1
      @restaurants = current_user
        .restaurants_for(cookies[:filter])
        .paginate(:page => params[:page])
      @next_restaurants_count = current_user
        .restaurants_for(cookies[:filter])
        .paginate(:page => params[:page].to_i+1)
        .length
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
