class IdentitiesController < ApplicationController
  def new
    @identity = env['omniauth.identity']
    render layout: "guest"
  end
end
