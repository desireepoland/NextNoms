class SiteController < ApplicationController
  def index
    @key = ENV["GOOGLE_API_KEY"]
  end
end
