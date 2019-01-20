class IncludedLoginCredentialsController < ApplicationController
  before_action :authenticate_user

  def authenticate_user
    authentication = params[:authentication]
    return unless authentication.present?
    user = User.find_for_database_authentication(username: authentication[:username])
    sign_in(:user, user) if user.valid_password?(authentication[:password])
  end
end
