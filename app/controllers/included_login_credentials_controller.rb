class IncludedLoginCredentialsController < ApplicationController
  before_action :authenticate_user

  def authenticate_user
    username = params[:username]
    password = params[:password]
    return unless username.present? && password.present?
    user = User.find_for_database_authentication(username: username)
    sign_in(:user, user) if user.valid_password?(password)
  end
end
