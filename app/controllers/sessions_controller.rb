class SessionsController < ApplicationController
  before_action :ensure_params_exist, only: [:create]

  respond_to :json

  def create
    resource = User.find_for_database_authentication(username: params[:username])
    return invalid_login unless resource

    if resource.valid_password?(params[:password])
      sign_in(:user, resource)
      render json: { success: true }
      return
    end
    invalid_login(true)
  end

  def destroy
    if current_user.present?
      sign_out(current_user)
      render json: { success: true }
    else
      render json: {
        success: false,
        message: "No session."
      }
    end
  end

  protected

  def ensure_params_exist
    return unless params.has_key?(:login) && params.has_key?(:password)
    render json: {
      success: false,
      message: "Invalid request parameters."
    }, status: :unprocessable_entity
  end

  def invalid_login(password_invalid = false)
    warden.custom_failure!
    render json: {
      success: false,
      message: password_invalid ? "Incorrect password." : "Matching account not found."
    }, status: :unauthorized
  end
end
