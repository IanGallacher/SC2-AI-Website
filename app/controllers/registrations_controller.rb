class RegistrationsController < ApplicationController
  respond_to :json

  def create
    user = User.new(registration_params)
    if user.save
      render json: { success: true }, status: 201
    else
      warden.custom_failure!
      render json: user.errors, status: 422
    end
  end

  protected
    def registration_params
      params.permit(:username, :email, :password, :password_confirmation)
    end
end
