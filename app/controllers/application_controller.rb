class ApplicationController < ActionController::Base
#  protect_from_forgery with: :exception
  rescue_from CanCan::AccessDenied do |exception|
    if exception.message != "You are not authorized to access this page."
      render json: {error: exception.message}, status: 403
    elsif current_user
      render json: {error: "You are not authorized to access this resource."}, status: 403
    else
      render json: {error: "You must be logged in to perform this action."}, status: 401
    end
  end 

  # Configure devise to use usernames for login.
  before_action :configure_permitted_parameters, if: :devise_controller?
  protected
  def configure_permitted_parameters
    added_attrs = [:username, :email, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :sign_in, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end 
end
