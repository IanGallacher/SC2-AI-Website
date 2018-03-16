class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  rescue_from CanCan::AccessDenied do |exception|
    if exception.message != "You are not authorized to access this page."
      render json: {error: exception.message}, status: 403
    elsif current_user
      render json: {error: "You are not authorized to access this resource."}, status: 403
    else
      render json: {error: "You must be logged in to perform this action."}, status: 401
    end
  end 
end
