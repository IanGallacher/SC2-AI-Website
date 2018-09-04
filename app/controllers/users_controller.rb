class UsersController < ApplicationController
#  protect_from_forgery only: :destroy
  def index
    render json: current_user.as_json
  end

  def upload
    @user = User.find(params[:user_id])
    authorize! :update, @user
    if @user.update file: params[:file]
      render json: { status: :ok }
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  def password_reset
    @email = params[:email]
    if @email.blank?
      render json: { email: ["can't be blank"] }, status: :unprocessable_entity
    else
      user = User.find_by_email(params[:email])
      user.send_reset_password_instructions if user
      # always return ok regardless of whether user exists
      # to avoid people fishing for emails
      render json: { status: :ok }
    end
  end

  def update
    @user = User.find(params[:id])
    authorize! :update, @user
    if @user.update_attributes(update_params)
      render json: { status: :ok }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
  def update_params
    params.permit(:github)
  end
end
