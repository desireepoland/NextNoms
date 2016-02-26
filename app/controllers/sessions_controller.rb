class SessionsController < ApplicationController

  def new; end

  def create
  auth_hash = request.env['omniauth.auth']
  if auth_hash["uid"]
    @user = User.find_or_create_from_omniauth(auth_hash)
    if @user
      session[:user_id] = @user.id
    else
      flash[:notice] = "Failed to save the user"
    end
  else
    flash[:notice] = "Failed to authenticate"
  end
    redirect_to root_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
