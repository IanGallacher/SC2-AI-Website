class ApplicationController < ActionController::Base
#  protect_from_forgery with: :exception
#  def render_standard_error(exception, status)
#    error_hash = { error: exception.message }
#    error_hash[:backtrace] = exception.backtrace unless Rails.env.production?
#    render json: error_hash, status: status
#  end
#
#  rescue_from ::StandardError do |exception|
#    render_standard_error(exception, 500)
#  end
#
#  rescue_from ActiveRecord::RecordNotFound do |exception|
#    render_standard_error(exception, 404)
#  end

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
