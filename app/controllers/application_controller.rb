class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :current_user, :set_default_cookies

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  helper_method :logged_in?
  helper_method :current_user

  def set_default_cookies
    cookies[:filter] ||= 'all'
    cookies[:roulette_filter] ||= 'all'
  end

  def require_login
    unless current_user
      flash[:error] = "Please log in."
      redirect_to root_path
    end
  end

  def logged_in?
    !!current_user
  end
end
